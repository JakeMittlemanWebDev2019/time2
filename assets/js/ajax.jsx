import store from './store';

export function post(path, body) {
  let state = store.getState();
  console.log(state);
  let token = state.session.token;

  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function get(path) {
  let state = store.getState();
  let token = state.session.token;

  return fetch('/ajax' + path, {
    method: 'get',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
  }).then((resp) => resp.json());
}

export function submit_new_timesheet(form) {
  let state = store.getState();
  let data = state.forms.new_timesheet;


  post('/timesheets', {
    photo: {
      hours: data.hours,
      note: data.note,
      user_id: 1,
    }
  }).then((resp) => {
    console.log(resp);
    if (resp.data) {
      store.dispatch({
        type: 'ADD_TIMESHEET',
        data: [resp.data],
      });
      form.redirect('/timesheets/' + resp.data.id);
    }
    else {
      store.dispatch({
        type: 'CHANGE_NEW_TIMESHEET',
        data: { errors: JSON.stringify(resp.errors) },
      });
    }
  });
}

export function submit_login(form) {
  let state = store.getState();
  let data = state.forms.login;

  post('/sessions', data)
    .then((resp) => {
      if (resp.token) {
        localStorage.setItem('session', JSON.stringify(resp));
        store.dispatch({
          type: 'LOG_IN',
          data: resp,
        });
        form.redirect('/');
      }
      else {
        store.dispatch({
          type: 'CHANGE_LOGIN',
          data: { errors: JSON.stringify(resp.errors) },
        });
      }
    });
}