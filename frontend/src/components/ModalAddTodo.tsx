import React, { useState } from "react";
import {  Button, Checkbox, Form, Input, Modal } from "antd";
import { Todo } from "../types";
import { Dayjs } from "dayjs";
import axios from "axios";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface ModalAddTodoInterface {
  isModalAddTodoOpen: boolean;
  setIsModalAddTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  value: Dayjs | undefined;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>
}


const ModalAddTodo = (props: ModalAddTodoInterface) => {
  
  const handleSubmit = async (event: { preventDefault: () => void;})=> {
    event.preventDefault();
    if (props.value) {
      try {
        const response = await axios.post('http://localhost:3001/api/todos', {month: props.value.month() + 1, day: props.value.date(), title: props.title, description: props.description, status: props.status})
        if (response.status == 200) {
          props.setTodos(props.todos.concat(response.data));
          props.setTitle("")
          props.setDescription("")
          props.setStatus(false)
          props.setIsModalAddTodoOpen(false)
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    }
  }

  const onStatusChange = (event: CheckboxChangeEvent) => {
    props.setStatus(event.target.checked)
  }

  const onChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    props.setTitle(event.target.value)
  }

  const onChangeDescription: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    
    props.setDescription(event.target.value)
  }

  const handleOk = () => {
    props.setTitle("")
    props.setDescription("")
    props.setStatus(false)
    props.setIsModalAddTodoOpen(false);
  };

  const handleCancel = () => {
    props.setTitle("")
    props.setDescription("")
    props.setStatus(false)
    props.setIsModalAddTodoOpen(false);
  };

  return (
    <div>
      <Modal className="modal" mask={false} title="Add a new todo" open={props.isModalAddTodoOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: false }}
          autoComplete="off"
          preserve={false}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{required: true}]}

            >
            <Input onChange={onChangeTitle} placeholder=""/>
          </Form.Item>
          <Form.Item
            label="description"
            name="description"
            rules={[{required: true}]}
          >
            <Input onChange={onChangeDescription} placeholder=""/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
          <Checkbox onChange={onStatusChange}>Done</Checkbox>
        </Form>
      </Modal>
    </div>
  )
}

export default ModalAddTodo