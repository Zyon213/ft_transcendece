<template>
  <div class="lead">
    <h2>Leader Board</h2>
    <div class="lead-stat">
      <ul>
        <div class="title">
          <h3>Name</h3>
          <h3>Salary</h3>
          <h3>Age</h3>
        </div>
        <div v-for="item in list" v-bind:key="item.id" class="li-cont">
          <li class="li-cls">
            <div class="list">
              <h4>{{ item.employee_name }}</h4>
              <h4>{{ item.employee_salary }}</h4>
              <h4>{{ item.employee_age }}</h4>
            </div>
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

interface Employee {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
}

export default defineComponent({
  name: "EmployeeList",
  data() {
    return {
      list: [] as Employee[] // Initialize list as an array of Employee objects
    };
  },
  mounted() {
    axios
      .get("https://dummy.restapiexample.com/api/v1/employees")
      .then((resp: AxiosResponse<{ data: Employee[] }>) => {
        this.list = resp.data.data;
        console.warn(this.list);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }
});
</script>


<style scoped>
.lead {
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

.lead-stat {
  padding: 0;
  width: 100%;
  margin: 0;
  text-align: center;
}
.title {
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
.list {
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
.li-cls {
  list-style-type: none;
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
  .title,
  .list {
    flex-direction: column;
  }
}
</style>
