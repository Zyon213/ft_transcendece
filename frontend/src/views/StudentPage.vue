<template>
  <div class="std">
    <h2>stder Board</h2>
    <div class="std-stat">
      <ul>
        <div class="std-title">
          <h3>Id</h3>
          <h3>First</h3>
          <h3>Last</h3>
          <h3>Email</h3>
          <h3>Status</h3>
          <h3>Win</h3>
          <h3>Lose</h3>
          <h3>Draw</h3>
          <h3>Rank</h3>
        </div>
        <!-- <div v-for="item in student" v-bind:key="item.id" class="std-cont"> -->
        <div v-for="item in student" v-bind:key="item.id">
          <!-- <li class="std-cls"> -->
          <li>
            <h3>Id</h3>
            <h3>First</h3>
            <h3>Last</h3>
            <h3>Email</h3>
            <h3>Status</h3>
            <h3>Win</h3>
            <h3>Lose</h3>
            <h3>Draw</h3>
            <h3>Rank</h3>
            <!-- <div class="std-list"> -->
            <h4>{{ item.id }}</h4>
            <h4>{{ item.first_name }}</h4>
            <h4>{{ item.last_name }}</h4>
            <h4>{{ item.email }}</h4>
            <h4>{{ item.status }}</h4>
            <h4>{{ item.win }}</h4>
            <h4>{{ item.lose }}</h4>
            <h4>{{ item.draw }}</h4>
            <h4>{{ item.rank }}</h4>
            <!-- </div> -->
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosResponse } from "axios";
import { defineComponent } from "vue";

interface Students {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  win: number;
  lose: number;
  draw: number;
  rank: number;
}

export default defineComponent({
  name: "StudentList",
  data() {
    return {
      student: [] as Students[],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/users")
      .then((resp: AxiosResponse<{ data: Students[] }>) => {
        console.warn("Response:", resp.data);
        this.student = resp.data.data;
        console.warn("Student:", this.student);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  },
});
</script>
<style scoped>
.std {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #24272c;
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  color: white;
}

.std-stat {
  padding: 0;
  width: 100%;
  margin: 0;
  text-align: center;
}
.std-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #34373d;
  margin-bottom: 5px;
  width: 98%;
  margin-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 5px;
}
.std-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #34373d;
  width: 98%;
  margin-bottom: 5px;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 5px;
}
.std-cls {
  std-list-style-type: none;
}

.usr-img {
  width: 30px;
  border-radius: 50%;
  padding: 0;
  margin: 0;
}
.lst {
  padding: 0;
  margin: 0;
}
@media screen and (max-width: 768px) {
  .std-title,
  .std-list {
    flex-direction: column;
  }
}
</style>
