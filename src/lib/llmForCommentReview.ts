import OpenAI from "openai";
export const llmForCommentReview = new OpenAI({
  baseURL: process.env.OPENAI_FOR_COMMENT_REVIEW_BASE_URL,
  apiKey: process.env.OPENAI_FOR_COMMENT_REVIEW_API_KEY,
});
