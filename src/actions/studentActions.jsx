import {
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_ERROR,
  STUDENT_ADD_ERROR,
  STUDENT_ADD_REQUEST,
  STUDENT_ADD_SUCCESS,
  STUDENT_DELETE_ERROR,
  STUDENT_DELETE_REQUEST,
  STUDENT_DELETE_SUCCESS,
  STUDENT_UPDATE_ERROR,
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_ERROR,
  STUDENT_ROOM_NO_REQUEST,
  STUDENT_ROOM_NO_SUCCESS,
  STUDENT_ROOM_NO_ERROR,
} from "../constants/studentConstant";
import axios from "axios";
import { BASE_URL } from '../constants/base'

export const listStudents = (keyword = "", pageNumber = "") => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: STUDENT_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      BASE_URL+`/student/all?keyword=${keyword}&pageNumber=${pageNumber}`,
      config
    );
    dispatch({
      type: STUDENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_LIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addStudent = (student) => async (dispatch, getState) => {
  try {
    const {
      _id,
      name,
      address,
      category,
      city,
      contact,
      fatherContact,
      roomNo,
      blockNo,
      status,
    } = student

    dispatch({ type: STUDENT_ADD_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const image = student?.image
    const formData = new FormData();
    formData.append("avatar", image, image.name)
    formData.append("_id", _id)
    formData.append("name", name)
    formData.append("address", address)
    formData.append("category", category)
    formData.append("city", city)
    formData.append("contact", contact)
    formData.append("fatherContact", fatherContact)
    formData.append("roomNo", roomNo)
    formData.append("blockNo", blockNo)
    formData.append("status", status)


      console.log('the key and val is',formData.entries());
    student = {
      ...student,
      image: formData
    }
    const { data } = await axios.post(BASE_URL+`/student/addStudent`, formData, config);

    dispatch({
      type: STUDENT_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_ADD_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStudentDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(BASE_URL+`/student/${id}`, config);

    dispatch({
      type: STUDENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_DETAILS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStudent = (student) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      BASE_URL+`/student/${student._id}`,
      student,
      config
    );

    dispatch({
      type: STUDENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log('the err', error)
    dispatch({
      type: STUDENT_UPDATE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteStudent = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(BASE_URL+`/student/${id}`, config);

    dispatch({
      type: STUDENT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_DELETE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStudentsByRoomNo = (roomNo) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_ROOM_NO_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    if(roomNo) {
      const { data } = await axios.get(BASE_URL+`/student/room/${roomNo}`, config);
      dispatch({
        type: STUDENT_ROOM_NO_SUCCESS,
        payload: data,
      });
    }
    else {
      const { data } = await axios.get(BASE_URL+`/student/allRoom/1`, config);
      dispatch({
        type: STUDENT_ROOM_NO_SUCCESS,
        payload: data,
      });
    }
    
  } catch (error) {
    dispatch({
      type: STUDENT_ROOM_NO_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
