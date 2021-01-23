// eslint-disable-next-line no-unused-vars
import {
  CheckFirebaseDatabaseLoad,
  fbAppDatabaseTs,
} from "@/utils/FBCustDatabase";

export default {
  namespaced: true,

  /*
  В tasklist лежат записи вида

 // вид одного элемента

            createdAt: 1611394328248
            date: "2021-01-23"
            description: "Задача1 descr"
            key: "-MRi_XPr-LUD8WNWPiF4"
            status: "active"
            title: "Задача1"
            uid: "W8VQvIZ2tuYmTUAd0aHfaxgWXSp2"
     */

  state: () => ({
    taskList: [],
  }),

  mutations: {
    addNewTask(state, newTask) {
      state.taskList.push(newTask);
    },
    replaceTaskList(state, newTaskList) {
      state.taskList = newTaskList;
    },
  },
  getters: {
    taskListLength(state) {
      return state.taskList.length;
    },
    taskList(state) {
      return state.taskList;
    },
  },
  actions: {
    /*
    {W8VQvIZ2tuYmTUAd0aHfaxgWXSp2: {…}, pRIM5flM8uOO2vLjr4N0uNV61B93: {…}}
  W8VQvIZ2tuYmTUAd0aHfaxgWXSp2: uuid
  W8VQvIZ2tuYmTUAd0aHfaxgWXSp2 - Иван
      -MRi_XPr-LUD8WNWPiF4: key
      createdAt: 1611394328248
      date: "2021-01-23"
      description: "Задача1 descr"
      status: "active"
      title: "Задача1"
      __proto__: Object
     */

    // eslint-disable-next-line no-unused-vars
    async readTasks({ commit }) {
      console.log("readTasks start");

      CheckFirebaseDatabaseLoad();
      const dataSnapshot = await fbAppDatabaseTs.ref("tasks/").once("value");
      const taskList = await dataSnapshot.val();
      // console.log(taskList);
      const newtasks = [];

      // Преобразуем таски в плоский массив

      Object.keys(taskList) // ключи uuid
        .forEach((item) => {
          // console.log("taskList[item] ", taskList[item]);
          Object.keys(taskList[item]).forEach((itm) => {
            taskList[item][itm].uid = item;
            taskList[item][itm].key = itm;
            newtasks.push(taskList[item][itm]);
          });

          // console.log("taskList[item] :", taskList[item]);
        });
      commit("replaceTaskList", newtasks);
      // console.log(newtasks);
      // вид одного элемента
      /*
            createdAt: 1611394328248
            date: "2021-01-23"
            description: "Задача1 descr"
            key: "-MRi_XPr-LUD8WNWPiF4"
            status: "active"
            title: "Задача1"
            uid: "W8VQvIZ2tuYmTUAd0aHfaxgWXSp2"
       */
    },
  },
};
