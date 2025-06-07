import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide description."],
    minLength: [30, "Description must contain at least 30 Characters!"],
    maxLength: [500, "Description cannot exceed 500 Characters!"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
  },
  country: {
    type: String,
    required: [true, "Please provide a country name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide location."],
    minLength: [20, "Location must contain at least 20 characters!"],
  },
  company: {
    type: String,
    required: [true, "Please provide a company name."],
    minLength: [2, "Company name must have at least 2 characters."],
    maxLength: [50, "Company name cannot exceed 50 characters."],
  },
  vacancy: {
    type: Number,
    required: [true, "Please provide number of vacancies."],
    min: [1, "Vacancy must be at least 1"],
    max: [10000, "Vacancy cannot exceed 10000"],
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"],
    required: [true, "Please provide job type."],
    default: "Full-time",
  },
  logo: {
    type: String, // URL to the company logo
    default: "",
  },
  fixedSalary: {
    type: Number,
    min: [1000, "Salary must be at least 1000"],
    max: [999999999, "Salary cannot exceed 9 digits"],
  },
  salaryFrom: {
    type: Number,
    min: [1000, "Salary must be at least 1000"],
    max: [999999999, "Salary cannot exceed 9 digits"],
  },
  salaryTo: {
    type: Number,
    min: [1000, "Salary must be at least 1000"],
    max: [999999999, "Salary cannot exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields automatically
});

export const Job = mongoose.model("Job", jobSchema);
