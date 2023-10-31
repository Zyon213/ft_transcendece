<template>
  <div id="home">
    <TopNavBar />
    <div class="side-cont">
      <SideNavBar />
      <!-- <div class="nav"> -->
        <router-view v-slot="{ Component }">
          <!-- <Transition name="moveUp"> -->
          <Transition name="slide" mode="out-in">
            <component :is="Component" :key="$route.path"></component>
          </Transition>
        </router-view>
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TopNavBar from "@/components/TopNavBar.vue";
import SideNavBar from "@/components/SideNavBar.vue";

export default defineComponent({
  name: "homePage",
  components: {
    TopNavBar,
    SideNavBar,
  },
});
</script>

<style scoped>
body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
}
.side-cont {
  display: flex;
}
.prof-cont {
  flex: 1;
  padding: 20px;
}

.slide-enter-active{
	transition: all 0.3s ease-out;
}
.slide-leave-active {
	transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.nav{
	width: 100%;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
/* .moveUp-enter-active{
	animation: fadeIn 1s ease-in;
}

@keyframes fadeIn{
	0% { opacity: 0;}
	50% { opacity: 0.5;}
	100% { opacity: 1;}
}

.moveUp-leave-active{
	animation: moveUp 0.3s ease-in;
}

@keyframes moveUp{
	0% { transform: translateY(0);}
	100% { transform: translateY(-500px);}
} */
</style>
