import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_COURSE, DEFAULT_NEW_LESSON } from 'assets/data';
import { COURSE_FEATURE } from 'constants/general';
import { CourseSliceType, CourseType, Lesson } from 'constants/interface';

const initialState: CourseSliceType = {
  courses: [],
  showCourseDetail: false,
  isEditingCourse: false,
  isNewCourseModalOpened: false,
  isLoading: false,
  error: {
    value: false,
    message: '',
  },
  course: DEFAULT_COURSE,
  newCourse: {
    id: '',
    name: '',
    description: '',
    isNew: true,
  },
};

export const courseSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCourses: (state, { payload }: PayloadAction<CourseType[]>) => {
      state.courses = payload;
    },
    updateCourse: (
      state,
      {
        payload,
      }: PayloadAction<{ course: CourseType; showCourseDetail: boolean }>
    ) => {
      state.course = payload.course;
      state.showCourseDetail = payload.showCourseDetail;
    },
    updateShowCourseDetail: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.showCourseDetail = payload;
    },
    updateIsEditingCourse: (state, { payload }) => {
      state.isEditingCourse = payload;
    },
    updateError: (
      state,
      { payload }: PayloadAction<{ value: boolean; message: string }>
    ) => {
      state.error = payload;
    },
    updateNewLesson: (state) => {
      state.course?.lessons?.push(DEFAULT_NEW_LESSON);
    },
    removeCourseLesson: (state, { payload }) => {
      if (state.course) {
        state.course.lessons = state.course?.lessons?.filter(
          (_, index) => payload !== index
        );
      }
    },
    updateCourseLessons: (state, { payload }: PayloadAction<Lesson[]>) => {
      state.course.lessons = payload;
    },
    updateCourseDetails: (
      state,
      {
        payload: { position, value, course_feature },
      }: PayloadAction<{
        position: number;
        value: string;
        course_feature: string;
      }>
    ) => {
      if (state.course.lessons?.length) {
        switch (course_feature) {
          case COURSE_FEATURE.TITLE:
            state.course.lessons[position].title = value;
            break;
          case COURSE_FEATURE.CONTENT:
            state.course.lessons[position].content = value;
            break;
          default:
            state.course.lessons[position].url = value;
        }
      }
    },
    updateIsNewCourseModalOpened: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isNewCourseModalOpened = payload;
    },
    updateNewCourse: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        name: string;
        description: string;
        isNew: boolean;
      }>
    ) => {
      state.newCourse = payload;
    },
  },
});

export const {
  updateCourse,
  updateIsEditingCourse,
  updateCourses,
  updateError,
  updateNewLesson,
  updateShowCourseDetail,
  removeCourseLesson,
  updateCourseDetails,
  updateCourseLessons,
  updateIsNewCourseModalOpened,
  updateNewCourse,
} = courseSlice.actions;
export default courseSlice.reducer;