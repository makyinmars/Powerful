import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Progress,
  CreateProgressRequest,
} from "../../services/interfaces/progressInterface";
import { RootState } from "../../store";

export const createProgress = createAsyncThunk(
  "progress/createProgress",
  async (createResponse: CreateProgressRequest, { getState }) => {
    const token = (getState() as RootState).auth.token;

    const { image, description, weight, userId } = createResponse;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("weight", weight);
    formData.append("userId", userId);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post<Progress>(
      `${process.env.API_URL}/api/progress`,
      formData,
      config
    );

    return data;
  }
);

const initialState: Progress = {
  id: "",
  picture: "",
  description: "",
  weight: 0,
  cloudinary_id: "",
  userId: "",
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createProgress.pending, (state) => {
      console.log("Pending");
    });
    builder.addCase(createProgress.fulfilled, (state, { payload }) => {
      console.log("PAYLOAD", payload);
      const { id, picture, description, weight, cloudinary_id, userId } =
        payload;
      state.id = id;
      state.picture = picture;
      state.description = description;
      state.weight = weight;
      state.cloudinary_id = cloudinary_id;
      state.userId = userId;
    });
    builder.addCase(createProgress.rejected, (state) => {
      console.log("REJECTEd");
    });
  },
});

export default progressSlice.reducer;
