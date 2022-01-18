import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  Progress,
  CreateProgressRequest,
  ProgressState,
  EditProgressRequest,
} from "@/app/services/interfaces/progressInterface";
import { RootState } from "@/app/store";

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

export const updateProgress = createAsyncThunk(
  "progress/updateProgress",
  async (updateProgress: EditProgressRequest, { getState }) => {
    const token = (getState() as RootState).auth.token;

    const { image, description, weight, userId, id } = updateProgress;

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

    const { data } = await axios.put<Progress>(
      `${process.env.API_URL}/api/progress/${id}`,
      formData,
      config
    );

    return data;
  }
);

const initialState: ProgressState = {
  currentProgress: {
    id: "",
    picture: "",
    description: "",
    weight: 0,
    cloudinary_id: "",
    userId: "",
  },
  progressStatus: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: "",
  },
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    clearCurrentProgress: (state) => {
      state.currentProgress = {
        id: "",
        picture: "",
        description: "",
        weight: 0,
        cloudinary_id: "",
        userId: "",
      };
    },
    clearProgressStatus: (state) => {
      state.progressStatus = {
        isLoading: false,
        isError: false,
        isSuccess: false,
        errorMessage: "",
      };
    },
  },
  extraReducers: (builder) => {
    // Create progress
    builder.addCase(createProgress.pending, (state) => {
      state.progressStatus.isLoading = true;
    });
    builder.addCase(createProgress.fulfilled, (state, { payload }) => {
      state.currentProgress = payload;
      state.progressStatus.isLoading = false;
      state.progressStatus.isSuccess = true;
    });
    builder.addCase(createProgress.rejected, (state) => {
      state.progressStatus.isLoading = false;
      state.progressStatus.isError = true;
      state.progressStatus.isSuccess = false;
      state.progressStatus.errorMessage = "Error creating progress";
    });

    // Update progress
    builder.addCase(updateProgress.pending, (state) => {
      state.progressStatus.isLoading = true;
    });
    builder.addCase(updateProgress.fulfilled, (state, { payload }) => {
      state.currentProgress = payload;
      state.progressStatus.isLoading = false;
      state.progressStatus.isSuccess = true;
    });
    builder.addCase(updateProgress.rejected, (state) => {
      state.progressStatus.isLoading = false;
      state.progressStatus.isError = true;
      state.progressStatus.isSuccess = false;
      state.progressStatus.errorMessage = "Error updating progress";
    });
  },
});

export const { clearProgressStatus, clearCurrentProgress } =
  progressSlice.actions;
export default progressSlice.reducer;
