import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import store from '../store'
import { connect } from 'react-redux';
import { Form, Button, Table } from 'react-bootstrap';

import { submit_new_timesheet } from '../ajax'

function state2props(state) {
  return state.forms.new_timesheet;
}

class TimesheetsNew extends React.Component {
  constructor(props) {
    super(props)
  }


  changed(data, i) {
    this.props.dispatch({
      type: 'CHANGE_NEW_TIMESHEET',
      data: data,
      key: i,
    });
  }

  addRow() {
    this.props.dispatch({
      type: 'ADD_ROW'
    })
  }

  removeRow() {
    this.props.dispatch({
      type: 'DELETE_ROW'
    })
  }

  render() {
    return (
      <div>
        <h1>New Timesheet</h1>
        <Table striped bordered>
          <tbody>
            <RenderForms root={this} />
          </tbody>
        </Table>
        <Form.Group controlId="submit">
          <Button variant="primary"
            onClick={() => submit_new_timesheet(this)}>Submit Timesheet</Button>
        </Form.Group>
      </div >
    );
  }
}

function RenderForms(props) {
  // TODO: put range from store here
  let state = store.getState();
  let { root } = props;
  let num_rows = 1;
  if (state.forms.new_timesheet) {
    num_rows = state.forms.new_timesheet.tasks.length;
  }


  let jobs = _.map(state.jobs, (job, i) => {
    return i;
  })


  return _.map(_.range(0, num_rows), (i) => {
    let buttons = null;
    if (i == (num_rows - 1)) {
      if (i == 7) {
        buttons = (<td><Button variant="primary" id="minus"
          onClick={() => root.removeRow()}>-</Button>
          <Button variant="primary" id="plus" disabled
            onClick={() => root.addRow()}>+</Button></td>);
      } else if (i == 0) {
        buttons = (<td><Button variant="primary" id="minus" disabled
          onClick={() => root.removeRow()}>-</Button>
          <Button variant="primary" id="plus"
            onClick={() => root.addRow()}>+</Button></td>);
      } else {
        buttons = (<td><Button variant="primary" id="minus"
          onClick={() => root.removeRow()}>-</Button>
          <Button variant="primary" id="plus"
            onClick={() => root.addRow()}>+</Button></td>);
      }
    } else {
      buttons = (<td></td>);
    }
    return (
      < tr key={i}>
        <td>
          <Form.Group controlId="hours">
            <Form.Label>Hours</Form.Label>
            <Form.Control type="number" min="1"
              onChange={(ev) => root.changed({ hours: ev.target.value }, i)} />
          </Form.Group>
        </td>
        <td>
          <Form.Group controlId="note">
            <Form.Label>Note</Form.Label>
            <Form.Control as="textarea" rows="1"
              onChange={(ev) => root.changed({ note: ev.target.value }, i)} />
          </Form.Group>
        </td>
        <td>
          <Form.Group controlId="job_code">
            <Form.Label>Job Code</Form.Label>
            <Form.Control as="select"
              onChange={(ev) => root.changed({ job: ev.target.value }, i)}>
              {jobs}
            </Form.Control>
          </Form.Group>
        </td>
        {buttons}
      </tr >);
  });
}

// function GetJobs() {
//   // get jobs from here
//   let jobs = Time2.Jobs.list_jobs();
//   return _.map(jobs, job => {
//     return (<option>job.name</option>);
//   })
// }

export default connect(state2props)(TimesheetsNew);