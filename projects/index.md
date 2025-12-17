# Projects

<script setup>
import spaceImg from './space/space-cut.png'
import tlImg from './tl/icon.png'
import finImg from './fin/icon.png'
</script>

<div class="flex flex-col justify-center mt-2 gap-4">
    <ProjectCard title="space" description="Novel computing interface" href="/projects/space" :image="spaceImg"/>
    <ProjectCard title="tl" description="Translator desktop app" href="https://github.com/semanticdreams/tl" :image="tlImg"/>
    <ProjectCard title="fin" description="Personal finance flutter app" href="https://github.com/semanticdreams/fin" :image="finImg"/>
</div>
