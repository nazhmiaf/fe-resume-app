import api from "../configs/axios";

export const getResumes = () => api.get("/resume").then((res) => res.data);

export const getResumeById = (resumeId) =>
  api.get(`/resume/${resumeId}`).then((res) => res.data);

export const getPublicResume = (resumeId) =>
  api.get(`/resume/public/${resumeId}`).then((res) => res.data);

export const createResume = ({ title }) =>
  api.post("/resume", { title }).then((res) => res.data);

export const updateResume = (resumeId, resumeData, { image, removeBackground } = {}) => {
  const formData = new FormData();
  formData.append("resumeData", JSON.stringify(resumeData));
  if (image) {
    formData.append("image", image);
    if (removeBackground) {
      formData.append("removeBackground", "true");
    }
  }
  return api.put(`/resume/${resumeId}`, formData).then((res) => res.data);
};

export const exportResumePdf = (resumeId, { html, css }) =>
  api
    .post(`/resume/${resumeId}/pdf`, { html, css }, { responseType: "blob", timeout: 60000 })
    .then((res) => res.data)
    .catch(async (error) => {
      const data = error.response?.data;
      if (data instanceof Blob) {
        try {
          error.response.data = JSON.parse(await data.text());
        } catch {
          //bukan JSON, biarkan apa adanya
        }
      }
      throw error;
    });

export const deleteResume = (resumeId) =>
  api.delete(`/resume/${resumeId}`).then((res) => res.data);
