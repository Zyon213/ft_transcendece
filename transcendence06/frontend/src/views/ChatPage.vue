<template>
  <div
    class="flex flex-wrap justify-between bg-gradient-to-r from-[#451952] via-[#451952] to-[#ae4188] shadow-custom text-white w-full m-5 rounded-md p-2.5 min-h-[85.9vh] text-center"
  >
    <div
      class="flex-col items-center justify-between w-full min-h-[85.9vh] lg:w-1/5 m-0"
    >
      <h2>My Channel</h2>
      <div
        class="flex-col items-center justify-center p-0 m-0 mt-5 w-full min-h-[85.9vh] bg-gradient-to-r from-[#ae445a] to-[#662549] shadow-custom rounded-[5px]"
      >
        <!-- <div
        class="flex-col items-center justify-between p-0 m-0 mt-5 w-full bg-gradient-to-r from-[#ae445a] to-[#662549] shadow-custom rounded-[10px]"
		> -->
        <ButtonComponent
          class="m-2"
          btnContent="Create Channel"
          @click="AddChannelForm"
        />
        <CreateChannel v-if="isAddChannelForm" @close="closeAddChannelForm" />
        <div>
          <input
            placeholder="Search channel"
            @click="filteredSearchchanel"
            class="w-9/12 md:w-10/12 h-[1.5rem] border-0 text-black ml-2 rounded-md pl-4 mb-2 focus:border-0 focus:outline-none"
          />
        </div>
        <ChannelMembers v-if="isSearchChannelVisible" />
        <div class="flex justify-between m-0 mt-2 p-0 w-full">
          <div class="w-full h-[350px] overflow-y-auto">
            <ul class="w-[95%] p-1 m-1">
              <div v-for="(result, index) in filteredSearch" :key="index">
                <li class="list-none w-full mb-2">
                  <div
                    class="flex items-center justify-between mb-2 bg-gradient-to-l from-[#ae4488] to-[#f39f5a] shadow-custom px-1 w-full rounded-[10px] chn-item"
                  >
                    <a href="#" @click="showUserList(result.channel)">
                      <div class="mx-2 px-5">
                        {{ result.channel }}
                      </div>
                    </a>
                    <ChannelOption class="relative w-9 h-9" />
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div class="flex-col items-center justify-between w-full m-0 my-4">
          Members List
          <div class="flex justify-center m-0 mt-2 p-0 w-full">
            <div class="w-full h-[250px] overflow-y-auto">
              <ul class="w-[95%] p-1 m-1">
                <div v-for="(user, index) in userList" :key="index">
                  <li class="list-none w-full mb-1">
                    <div
                      class="flex items-center justify-between mb-1 bg-gradient-to-l from-[#ae4488] to-[#f39f5a] shadow-custom mx-1 p-2 w-full rounded-[10px] usr-item"
                    >
                      <router-link to="/home">
                        <div class="mx-0 px-5">{{ user }}</div></router-link
                      >

                      <button class="intbtn">Invite</button>
                    </div>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div class="chn-btm">
          <button class="grpbtn">Group</button>
          <button class="dmbtn">DM</button>
        </div>
      </div>
    </div>
    <div class="w-full min-h-[85.9vh] lg:w-58 m-0">
      <h1 class="text-2xl">Chat</h1>
      <div
        class="flex-col items-center justify-center p-0 m-0 mt-3 w-full min-h-[85.9vh] bg-gradient-to-r from-[#ae445a] to-[#662549] shadow-custom"
      >
        <div
          class="bg-white h-[420px] p-1 mb-5 m-1 text-black"
          style="text-align: right"
        >
          <div v-for="(chatMessage, index) in chatMessage" :key="index">
            <div
              class="bg-gray-500 text-black py-2 px-4 inline-block m-1 mx-5 rounded-md"
              style="max-width: 300px"
            >
              {{ chatMessage }}
            </div>
          </div>
        </div>

        <div class="w-full">
          <input
            v-model="message"
            placeholder="message"
            class="w-[80%] h-[2rem] border-0 text-black ml-2 mr-1 rounded-full pl-4 mb-2 focus:border-0 focus:outline-none"
          />
          <ButtonComponent btnContent="Send" @click="sendMessage" />
        </div>
      </div>
    </div>
    <div
      class="flex-col items-center justify-center w-full min-h-[85.9vh] lg:w-1/5 m-0"
    >
      <h2>All Channel</h2>
      <div
        class="flex-col items-center justify-center p-0 m-0 mt-5 w-full min-h-[85.9vh] bg-gradient-to-r from-[#ae445a] to-[#662549] shadow-custom rounded-[5px]"
      >
        <div class="all-chn">
          <div class="pub-div">
            <div class="text-lb m-2">
              Public Channels
              <div class="flex justify-between m-0 mt-2 p-0">
                <div class="h-[250px] overflow-y-auto">
                  <ul>
                    <div
                      v-for="(result, index) in filteredPublicChannel"
                      :key="index"
                    >
                      <li class="list-none w-full">
                        <div
                          class="flex items-center justify-between mb-1 bg-gradient-to-l from-[#ae4488] to-[#f39f5a] shadow-custom px-1 w-full rounded-[5px]"
                        >
                          {{ result.channel }}
                          <div class="relative">
                            <button class="jpub-btn">Join</button>
                          </div>
                        </div>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="pri-div">
            Private Channels
            <div class="flex justify-between m-0 mt-2 p-0">
              <div class="h-[250px] overflow-y-auto">
                <ul>
                  <div
                    v-for="(result, index) in filteredPrivateChannel"
                    :key="index"
                  >
                    <li class="list-none w-full">
                      <div
                        class="flex items-center justify-between mb-1 bg-gradient-to-l from-[#ae4488] to-[#f39f5a] shadow-custom px-1 w-full rounded-[5px]"
                      >
                        {{ result.channel }}
                        <div class="relative">
                          <ButtonComponent
                            btnContent="Join"
                            class="m-2"
                            @click="showPasswordForm"
                          />
                          <!-- <button class="jpub-btn" @click="isChannelPrivate">Join</button> -->
                        </div>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
            <ChannelPassword v-if="isPrivate" @close="closeisChannelPrivate" />
          </div>
        </div>

        <!-- <div v-if="selectedItem">
          <ul>
            <li
              class="flex bg-gradient-to-l from-[#ae4488] to-[#f39f5a] shadow-custom m-2 px-1 py-1 rounded-[10px]"
              v-for="user in selectedItem.user"
              :key="user"
            >
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center">
                  {{ user }}
                </div>
                <div class="flex items-center">
                  <OptionMenu class="relative text-sm w-8 h-8" />
                </div>
              </div>
            </li>
          </ul>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { defineComponent, onMounted, computed, ref } from "vue";
import ChannelOption from "@/components/ChannelOption.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import CreateChannel from "@/components/CreateChannel.vue";
import OptionMenu from "@/components/OptionMenu.vue";
import ChannelPassword from "@/components/ChannelPassword.vue";
import ChannelMembers from "@/components/ChannelMembers.vue";
import io from "socket.io-client";
import store from "@/store";
import { IChannel } from "@/models/channel";

export interface ChannelList {
  channel: string;
  group: string;
  user: string[];
  friend: boolean;
}
const chan = ref([] as IChannel[]);

export default defineComponent({
  data() {
    return {
      channels: chan,
      text: "" as string,
      message: "" as string,
      isAddChannelForm: false,
      isSearchChannelVisible: false,
      selectedItem: null as IChannel | null,
      isMessageSent: false,
      chatMessage: [] as string[],
      isPrivate: false,
      isMember: false,
      searchQuery: "" as string,
      //   selectedChannel: "",

      newchannels: [
        {
          channel: "fruits",
          group: "private",
          user: ["orange", "banana", "apple", "lemon", "peach"],
          friend: false,
        },
        {
          channel: "computer",
          group: "private",
          user: ["monitor", "window", "cpu", "mouse", "keybord"],
          friend: false,
        },
        {
          channel: "mamamls",
          group: "private",
          user: [
            "dog",
            "cat",
            "cow",
            "lion",
            "tiger",
            "elephant",
            "fish",
            "donkey",
          ],
          friend: false,
        },
      ] as ChannelList[],
      selectedChannel: null as string | null,
      userList: [] as string[],
      // searchQuery: "" as string,
    };
  },
  setup() {
    const all = async () => {
      await store.dispatch("fetchAllChan");
      const channel = computed(() => store.getters.getAllChannel);
      // console.log(channel.value);
      const arrayProxy = channel.value;
      arrayProxy.forEach((item: any) => {
        // console.log(item);
        const new_chan: IChannel = {
          name: item.room_name,
          // state: item.state,
          id: item.id,
          owner: null,
          messages: null,
          admins: null,
          members: null,
          invites: null,
          isPrivate: item.isPrivate,
          isProtected: item.isProtected,
          isPublic: item.isPublic,
          password: item.password,
        };
        chan.value.push(new_chan);
      });
    };
    if (!chan.value.length) all();
  },
  components: {
    ChannelOption,
    ButtonComponent,
    CreateChannel,
    OptionMenu,
    ChannelPassword,
    ChannelMembers,
  },
  computed: {
    filteredSearch(): ChannelList[] {
      return this.newchannels.filter(
        (item) =>
          item.channel.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          item.group === "private"
      );
    },

    filteredMyChannel(): IChannel[] {
      return this.channels.filter(
        (item: IChannel) =>
          item.name /* .toLowerCase().includes(this.searchQuery.toLowerCase()) &&
					item.member === true */
      );
    },
    filteredPublicChannel(): IChannel[] {
      return this.channels.filter(
        (item: any) =>
          item.name /* .toLowerCase().includes(this.searchQuery.toLowerCase())*/ &&
          item.isPublic === true
      );
    },
    filteredPrivateChannel(): IChannel[] {
      return this.channels.filter(
        (item: any) => console.log(item)
        // item.name && item.isProtected === true
        // item.name/* .toLowerCase().includes(this.searchQuery.toLowerCase())*/ && item.isProtected === true
      );
    },
  },
  methods: {
    join_chan() {
      if (store.state.chat.socket)
        store.state.chat.socket.emit("join_room", {
          room_name: "azrachan",
          arg: "",
        });
    },
    send_chan_msg() {
      if (store.state.chat.socket)
        store.state.chat.socket.emit("send_msg_to_chan", {
          room_name: "azrachan",
          message: "hello world",
        });
    },
    send_priv_msg() {
      if (store.state.chat.socket)
        store.state.chat.socket.emit("private_message");
    },
    showPasswordForm() {
      this.isPrivate = true;
    },
    closePasswordFomr() {
      this.isPrivate = false;
    },
    AddChannelForm() {
      this.isAddChannelForm = true;
    },
    closeAddChannelForm() {
      this.isAddChannelForm = false;
    },
    showMyChannelList(result: IChannel) {
      this.selectedItem = result;
    },
    showSearchChannel() {
      this.isSearchChannelVisible = !this.isSearchChannelVisible;
    },
    sendMessage() {
      if (this.message) {
        this.chatMessage.push(this.message);
        this.isMessageSent = true;
        this.message = "";
      }
    },
    showChannelMembers() {
      this.isMember = true;
    },

    closeChannelMembers() {
      this.isMember = false;
    },

    showUserList(channel: string) {
      this.selectedChannel = channel;
      this.userList = this.filterUserList(channel);
    },

    filterUserList(channel: string) {
      const selectedChannel = this.newchannels.find(
        (item) => item.channel === channel
      );
      if (selectedChannel) {
        return selectedChannel.user;
      }
      return []; // Return an empty array if the channel is not found
    },
    created() {
      if (!store.state.chat.socket) {
        console.log("establishing connection again");
        store.state.chat.socket = io("http://localhost:3000/chat", {
          auth: {
            token: localStorage.getItem("token"),
          },
        });
      }
      store.state.chat.socket.on("create_room_success", (data: any) => {
        // event listener
        console.log("Room created successfully and back in front end", data);
        if (data) {
          const newChannel: IChannel = {
            name: data.chan_name,
            // state: data.state,
            id: data.id,
            owner: null,
            messages: null,
            admins: null,
            members: null,
            invites: null,
            password: data.pass,
            isPrivate: data.isPrivate,
            isProtected: data.isProtected,
            isPublic: data.isPublic,
            // user: data.user,
          };
          this.channels.push(newChannel);
        }
      });
      store.state.chat.socket.on("join_room_success", () => {
        console.log("Joined the channel successfully and back in front end");
      });
      store.state.chat.socket.on("chan_msg_success", () => {
        console.log(
          "Send message to channel successfully and back in front end"
        );
      });
      store.state.chat.socket.on("priv_msg_success", () => {
        console.log(
          "Send message to channel successfully and back in front end"
        );
      });
    },
  },
});
</script>

<style scoped>
.pub-btm {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding-bottom: 50;
}

.flex-col.items-center.justify-between {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grpbtn,
.dmbtn {
  font-size: 0.8rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  color: white;
  background: #451952;
  border: none;
}
.intbtn,
.jpub-btn {
  font-size: 0.8rem;
  margin: 3%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  background: #451952;
  border: none;
}
.intbtn:hover,
.jpub-btn:hover,
.chn-item:hover,
.grpbtn:hover,
.dmbtn:hover {
  background: #ae4488;
  color: #d9d9da;
}
.usr-item:hover {
  background: #6c4a5f;
  color: #d9d9da;
}
.all-chn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
}

.pub-div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.pri-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
