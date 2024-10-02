import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the types for income and expense entries
interface Entry {
  _id: number;
  category: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
}

interface EntriesState {
  incomeData: Entry[];
  expenseData: Entry[];
  loading: boolean;
  error: string | null;
  categories: string[];
}

const initialState: EntriesState = {
  incomeData: [],
  expenseData: [],
  loading: false,
  error: null,
  categories: [],
};

const API_BASE_URL = "http://localhost:5000/api";

export const fetchEntries = createAsyncThunk(
  "entries/fetchEntries",
  async () => {
    const [incomeResponse, expenseResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/incomes`),
      axios.get(`${API_BASE_URL}/expenses`),
    ]);
    return {
      income: incomeResponse.data,
      expense: expenseResponse.data,
    };
  }
);

export const createEntry = createAsyncThunk(
  "entries/createEntry",
  async ({ entry, type }: { entry: any; type: string }) => {
    const response = await axios.post(`${API_BASE_URL}/${type}s`, entry);
    return { ...response.data, type };
  }
);

export const updateEntry = createAsyncThunk(
  "entries/updateEntry",
  async ({ entry, type }: { entry: Entry; type: string }) => {
    const response = await axios.put(
      `${API_BASE_URL}/${type}s/${entry._id}`,
      entry
    );
    return { ...response.data, type };
  }
);

export const removeEntry = createAsyncThunk(
  "entries/removeEntry",
  async ({ _id, type }: { _id: number; type: string }) => {
    await axios.delete(`${API_BASE_URL}/${type}s/${_id}`);
    return { _id, type };
  }
);

const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.incomeData = action.payload.income;
        state.expenseData = action.payload.expense;
        state.error = null;
      })
      .addCase(fetchEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch entries";
      })

      .addCase(createEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEntry.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.type === "income") {
          state.incomeData.push(action.payload);
        } else {
          state.expenseData.push(action.payload);
        }
        state.error = null;
      })
      .addCase(createEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create entry";
      })

      .addCase(updateEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEntry.fulfilled, (state, action) => {
        state.loading = false;
        const { _id, type } = action.payload;
        if (type === "income") {
          state.incomeData = state.incomeData.map((item) =>
            item._id === _id ? action.payload : item
          );
        } else {
          state.expenseData = state.expenseData.map((item) =>
            item._id === _id ? action.payload : item
          );
        }
        state.error = null;
      })
      .addCase(updateEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update entry";
      })

      .addCase(removeEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeEntry.fulfilled, (state, action) => {
        state.loading = false;
        const { _id, type } = action.payload;
        if (type === "income") {
          state.incomeData = state.incomeData.filter(
            (item) => item._id !== _id
          );
        } else {
          state.expenseData = state.expenseData.filter(
            (item) => item._id !== _id
          );
        }
        state.error = null;
      })
      .addCase(removeEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete entry";
      });
  },
});

export default entriesSlice.reducer;
