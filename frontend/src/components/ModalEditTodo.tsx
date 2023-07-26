import { Button, Checkbox, Form, Input, Modal } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "axios";
import React, { useState } from "react";
import { Todo } from "../types";
import { DeleteOutlined } from "@ant-design/icons";

interface ModalHolderProps {
  isModalEditTodoOpen: boolean;
  todos: Todo[];
  editTitle: string;
  editDescription: string;
  editId: string;
  editMonth: number;
  editStatus: boolean;
  editDay: number;
  setIsModalEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditDescription: React.Dispatch<React.SetStateAction<string>>
  setEditID: React.Dispatch<React.SetStateAction<string>>
  setEditMonth: React.Dispatch<React.SetStateAction<number>>
  setEditStatus: React.Dispatch<React.SetStateAction<boolean>>
  setEditDay: React.Dispatch<React.SetStateAction<number>>;
}

const ModalEditTodo = (props: ModalHolderProps) => {  
  const [title, setTitle] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [status, setStatus] = useState<boolean | null>(null)

  const handleOk = () => {
    props.setIsModalEditOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalEditOpen(false);
  };

  const onChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setTitle(event.target.value)
  }

  const onChangeDescription: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setDescription(event.target.value)
  }

  const handleSubmit = async (event: { preventDefault: () => void;})=> {
    event.preventDefault();
    console.log('from handle submit', title);
    try {
      const response = await axios.put('http://localhost:3001/api/todos', {id: props.editId, month: props.editMonth, day: props.editDay, title: title, description: description, status: status})
      if (response.status == 200) {
        props.setTodos(props.todos.map((aTodo: Todo) => aTodo.id !== props.editId ? aTodo : response.data))
        setDescription("")
        setTitle("")
        props.setIsModalEditOpen(false)
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  const handleDelete = async (event: { preventDefault: () => void;})=> {
    event.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:3001/api/todos/${props.editId}`)
      if (response.status == 200) {
        props.setTodos(props.todos.filter((aTodo: Todo) => aTodo.id !== props.editId))
        props.setIsModalEditOpen(false)
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  const onStatusChange = (event: CheckboxChangeEvent) => {
    event.preventDefault();
    setStatus(event.target.checked)
  }

  return (
    <>
      <Modal mask={false} title="Change the title, the description or the status" open={props.isModalEditTodoOpen} onOk={handleOk} onCancel={handleCancel}>
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
            <Input onChange={onChangeTitle} placeholder={props.editTitle}/>
          </Form.Item>
          <Form.Item
            label="description"
            name="description"
            rules={[{required: true}]}
          >
            <Input onChange={onChangeDescription} placeholder={props.editDescription}/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
          <Checkbox onChange={onStatusChange}>Done</Checkbox>
          <DeleteOutlined onClick={handleDelete}/>
        </Form>
      </Modal>
    </>
  )
  
}

export default ModalEditTodo