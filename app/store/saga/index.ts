import { takeLatest, call, put } from "redux-saga/effects";
import { sagaFailure, sagaRequest, sagaSuccess } from "../slice";
import { delay } from "../../utils/delay";

function sagaApi(username: string, password: string) {
  return delay(2000);
}

function* sagaWorker(action: ReturnType<typeof sagaRequest>) {
  try {
    yield call(sagaApi, action.payload.username, action.payload.password);
    const token = "token";
    yield put(sagaSuccess(token));
  } catch (error: any) {
    yield put(sagaFailure(error.response?.data?.error || "Login failed"));
  }
}

function* authSaga() {
  yield takeLatest(sagaRequest.type, sagaWorker);
}

export default function* rootSaga() {
  yield authSaga();
}
