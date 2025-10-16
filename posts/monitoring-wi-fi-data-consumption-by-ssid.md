---
title: Monitoring Wi-Fi Data Consumption by SSID
description:
date: 2025-10-16
---

# Monitoring Wi-Fi Data Consumption by SSID

Useful when using phone's limited data plan for internet on Linux, via hotspot.

## Log connect/disconnect

Create directories:

```bash
sudo mkdir -p /var/log/wifi_usage
sudo chown root:root /var/log/wifi_usage
sudo chmod 755 /var/log/wifi_usage
```

Create file `/etc/NetworkManager/dispatcher.d/10-log-by-ssid` with content:

```bash
#!/bin/bash
# NetworkManager dispatcher script to log per-SSID byte usage
# Triggered with: $1 = interface name, $2 = action (up/down/etc)

IFACE="$1"
ACTION="$2"
LOGDIR="/var/log/wifi_usage"
STAT_RX="/sys/class/net/${IFACE}/statistics/rx_bytes"
STAT_TX="/sys/class/net/${IFACE}/statistics/tx_bytes"

# Only run for Wi-Fi interfaces (skip if stats not available)
[ -r "$STAT_RX" ] || exit 0
[ -r "$STAT_TX" ] || exit 0

timestamp() {
  date --iso-8601=seconds
}

# helper to get currently connected SSID for this iface (if any)
get_ssid() {
  /usr/bin/nmcli -t -f DEVICE,TYPE,STATE,CONNECTION device 2>/dev/null \
    | awk -F: -v dev="$IFACE" '$1==dev && $2=="wifi" && $3=="connected" {print $4; exit}'
}

case "$ACTION" in
  up|vpn-up|pre-up)
    SSID="$(get_ssid)"
    [ -z "$SSID" ] && exit 0
    # store start counters
    mkdir -p "$LOGDIR"
    echo "$(timestamp),START,$IFACE,$(cat $STAT_RX),$(cat $STAT_TX)" >> "$LOGDIR/${SSID}.csv"
    ;;
  down|vpn-down|pre-down)
    SSID="$(get_ssid)"
    # If SSID empty (common on down), use the newest CSV file
    if [ -z "$SSID" ]; then
      lastssid="$(ls -t $LOGDIR/*.csv 2>/dev/null | head -n1 | xargs -n1 basename | sed 's/\.csv$//')"
      SSID="$lastssid"
    fi
    [ -z "$SSID" ] && exit 0

    rx_now=$(cat $STAT_RX)
    tx_now=$(cat $STAT_TX)

    # find the most recent START line for this iface and SSID to compute delta
    start_line="$(grep -h "START,${IFACE}" "$LOGDIR/${SSID}.csv" 2>/dev/null | tail -n1)"
    if [ -n "$start_line" ]; then
      start_rx=$(echo "$start_line" | awk -F, '{print $4}')
      start_tx=$(echo "$start_line" | awk -F, '{print $5}')
      delta_rx=$((rx_now - start_rx))
      delta_tx=$((tx_now - start_tx))
      [ "$delta_rx" -lt 0 ] && delta_rx=0
      [ "$delta_tx" -lt 0 ] && delta_tx=0
      echo "$(timestamp),SESSION,$IFACE,$start_rx,$start_tx,$rx_now,$tx_now,$delta_rx,$delta_tx" >> "$LOGDIR/${SSID}.csv"
    else
      echo "$(timestamp),ORPHAN,$IFACE,,$rx_now,$tx_now" >> "$LOGDIR/${SSID}.csv"
    fi
    ;;
  *)
    # ignore other events
    ;;
esac

exit 0
```

Make it executable and restart networking:

```bash
sudo chown root:root /etc/NetworkManager/dispatcher.d/10-log-by-ssid
sudo chmod 755 /etc/NetworkManager/dispatcher.d/10-log-by-ssid
sudo systemctl restart NetworkManager.service
```

## Log continuous updates

Need to capture custom SNAPSHOT entries, otherwise output would only update after disconnect.

Create `/usr/local/bin/wifi_usage_poll.sh` with content:

```bash
#!/bin/bash
# wifi_usage_poll.sh — periodically logs usage to /var/log/wifi_usage/<SSID>.csv

IFACE="wlp58s0"   # change to your Wi-Fi interface
LOGDIR="/var/log/wifi_usage"

SSID=$(/usr/bin/nmcli -t -f DEVICE,TYPE,STATE,CONNECTION device 2>/dev/null \
  | awk -F: -v dev="$IFACE" '$1==dev && $2=="wifi" && $3=="connected" {print $4; exit}')

[ -z "$SSID" ] && exit 0

RX=$(cat /sys/class/net/$IFACE/statistics/rx_bytes)
TX=$(cat /sys/class/net/$IFACE/statistics/tx_bytes)

mkdir -p "$LOGDIR"
echo "$(date --iso-8601=seconds),SNAPSHOT,$IFACE,$RX,$TX" >> "$LOGDIR/${SSID}.csv"
```

Make it executable:
```bash
sudo chmod +x /usr/local/bin/wifi_usage_poll.sh
```

Make it run every minute:
```bash
echo "* * * * * root /usr/local/bin/wifi_usage_poll.sh" | sudo tee /etc/cron.d/wifi_usage_poll > /dev/null
```

## Output

Add script to `~/.local/bin/wifi-usage` and make executable with `chmod +x ~/.local/bin/wifi-usage`.

```bash
#!/bin/bash
# wifi-usage — Sum total data usage (GB) for a given SSID since a date/time,
# and show remaining allowance from a data limit.
#
# Usage:
#   wifi-usage <SSID> <LIMIT_GB> <SINCE_TIMESTAMP>
#
# Example (minute precision):
#   wifi-usage MyHotspot 10 2025-10-15T22:30
#
# The timestamp can be:
#   - YYYY-MM-DD
#   - YYYY-MM-DDTHH:MM
#   - YYYY-MM-DDTHH:MM:SS

LOGDIR="/var/log/wifi_usage"

if [ $# -lt 3 ]; then
  echo "Usage: $0 <SSID> <LIMIT_GB> <SINCE_TIMESTAMP>"
  echo "Example: $0 MyHotspot 10 2025-10-15T22:30"
  exit 1
fi

SSID="$1"
LIMIT_GB="$2"
SINCE_TIMESTAMP="$3"
FILE="$LOGDIR/${SSID}.csv"

if [ ! -f "$FILE" ]; then
  echo "Error: Log file not found for SSID '$SSID' at $FILE"
  exit 1
fi

# Convert date/time to seconds since epoch
since_ts=$(date -d "$SINCE_TIMESTAMP" +%s 2>/dev/null)
if [ -z "$since_ts" ]; then
  echo "Error: Invalid timestamp format. Use YYYY-MM-DD or YYYY-MM-DDTHH:MM"
  exit 1
fi

awk -F, -v since_ts="$since_ts" '
  function to_epoch(t) {
    # Convert ISO8601 timestamps to seconds since epoch
    gsub(/T/, " ", t)
    sub(/\+.*$/, "", t)
    cmd = "date -d \"" t "\" +%s"
    cmd | getline epoch
    close(cmd)
    return epoch
  }

  {
    ts = to_epoch($1)
    if (ts >= since_ts) {
      if ($2 == "SESSION") {
        rx += $8; tx += $9
      } else if ($2 == "SNAPSHOT") {
        if (prev_rx > 0 && prev_tx > 0) {
          drx = $4 - prev_rx
          dtx = $5 - prev_tx
          if (drx > 0) rx += drx
          if (dtx > 0) tx += dtx
        }
        prev_rx = $4
        prev_tx = $5
      }
    }
  }
  END { print rx, tx }
' "$FILE" | {
  read rx_sum tx_sum
  total_bytes=$((rx_sum + tx_sum))

  gb_total=$(awk -v t="$total_bytes" 'BEGIN {printf "%.3f", t / (1024^3)}')
  gb_rx=$(awk -v r="$rx_sum" 'BEGIN {printf "%.3f", r / (1024^3)}')
  gb_tx=$(awk -v t="$tx_sum" 'BEGIN {printf "%.3f", t / (1024^3)}')

  remaining=$(awk -v limit="$LIMIT_GB" -v used="$gb_total" 'BEGIN {printf "%.3f", limit - used}')

  #echo "SSID: $SSID"
  #echo "Date range: from $SINCE_TIMESTAMP"
  #echo "Limit: $LIMIT_GB GB"
  #echo "Used: $gb_total GB"
  #echo "Remaining: $remaining GB"
  #echo ""
  #echo "Breakdown:"
  #echo "  RX: ${gb_rx} GB"
  #echo "  TX: ${gb_tx} GB"
  echo $remaining GB
}
```

To show output on Xfce panel, add `Generic Monitor` item to panel and set command `wifi-usage MyHotspot 10 2025-10-15T22:30` in its properties. First number, 10, is the limit from which used GBs are subtracted, the following date is the start date from which usage should be considered.
