import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';
import _ from 'lodash';

/* Structure of store data:
 * {
 *   forms: {
 *     new_photo: {...},
 *     edit_photo: {...},
 *     new_user: {...},
 *     edit_user: {...},
 *   },
 *   users: Map.new(
 *     1 => {id: 1, name: "Alice", email: "alice@example.com"},
 *     ...
 *   ),
 *   photos: Map.new(
 *     1 => {id: 1, data: "...", desc: "...", tags: [...]},
 *     ...
 *   ),
 * 
 *    timesheets: {
 *      date: "2019/03/14",
 *      user_id: 4,
 *      tasks: [
 *        {job_code: "job_1", hours: 4, note: "weajf"}
 *      ]
 *    }
 * }
 */

function get_date() {
  let date = Date();
  let year = date.year;
  let month = date.month;
  let day = date.day;
  return month + "/" + day + "/" + year;
}

function new_timesheet(st0 = {
  date: null, user_id: null,
  tasks: [{ job_code: null, hours: null, note: "" }]
}, action) {
  switch (action.type) {
    case 'CHANGE_NEW_TIMESHEET':
      let new_tasks = st0.tasks;
      let task1 = st0.tasks[action.key];
      // if (task1) {
      console.log(task1)
      task1 = Object.assign({}, task1, action.data);
      new_tasks = Object.assign([], new_tasks);
      new_tasks[action.key] = task1;
      // } else {
      //   let new_task = { job_code: null, hours: null, note: "" };
      //   new_task = _.assign({}, new_task, action.data);
      //   new_tasks = Object.assign([], new_tasks);
      //   new_tasks.push(new_task);
      // }
      console.log(new_tasks);

      return Object.assign({}, st0, {
        tasks: new_tasks,
        date: get_date(),
      });

    case 'ADD_ROW':
      let default_task = { job_code: null, hours: null, note: "" };
      new_tasks = Object.assign([], st0.tasks);
      new_tasks.push(default_task);
      return Object.assign({}, st0, { tasks: new_tasks, date: get_date() });

    case 'DELETE_ROW':
      new_tasks = Object.assign([], st0.tasks);
      new_tasks = new_tasks.slice(0, new_tasks.length - 1);
      return Object.assign({}, st0, { tasks: new_tasks, date: get_date() })
    default:
      return st0;
  }
}

function login(st0 = { email: "", password: "", errors: null }, action) {
  switch (action.type) {
    case 'CHANGE_LOGIN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function forms(st0, action) {
  let reducer = combineReducers({
    new_timesheet,
    login,
  });
  return reducer(st0, action);
}

function workers(st0 = new Map(), action) {
  return st0;
}

function managers(st0 = new Map(), action) {
  return st0;
}

function timesheets(st0 = new Map(), action) {
  return st0;
}

function jobs(st0 = { job_code: null, name: "", budget: null, desc: "" }, action) {
  return st0;
}

function session(st0 = null, action) {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return st0;
  }
}

function root_reducer(st0, action) {
  console.log("root reducer", st0, action);
  let reducer = combineReducers({
    forms,
    workers,
    managers,
    timesheets,
    jobs,
    session,
  });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;