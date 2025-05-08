import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

interface ProjectState {
  selectedProject: string | null;
  hoveredProject: string | null;
}

const initialState: ProjectState = {
  selectedProject: null,
  hoveredProject: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setSelectedProject(state, action: PayloadAction<string | null>) {
      state.selectedProject = action.payload;
    },
    setHoveredProject(state, action: PayloadAction<string | null>) {
      state.hoveredProject = action.payload;
    },
  },
});

export const { setSelectedProject, setHoveredProject } = projectSlice.actions;

export const store = configureStore({
  reducer: {
    project: projectSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 