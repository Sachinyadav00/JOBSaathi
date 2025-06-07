import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";

// Get all jobs (only non-expired)
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

// Post a new job (with company, vacancy, jobType, logo)
export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }

  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    company,
    vacancy,
    jobType,
  } = req.body;

  // Check required fields
  if (
    !title ||
    !description ||
    !category ||
    !country ||
    !city ||
    !location ||
    !company ||
    !vacancy ||
    !jobType
  ) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  // Salary validation
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler(
        "Please either provide fixed salary or ranged salary.",
        400
      )
    );
  }
  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
    );
  }

  // Handle logo upload if logo file is provided
  let logoUrl = "";
  if (req.files && req.files.logo) {
    const logoFile = req.files.logo;

    // Validate logo file type
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(logoFile.mimetype)) {
      return next(
        new ErrorHandler(
          "Invalid logo file type. Allowed formats: PNG, JPEG, WEBP.",
          400
        )
      );
    }

    // Upload logo to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      logoFile.tempFilePath,
      {
        folder: "job_logos",
      }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(
        new ErrorHandler("Failed to upload Logo to Cloudinary", 500)
      );
    }

    logoUrl = cloudinaryResponse.secure_url;
  }

  const postedBy = req.user._id;

  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    company,
    vacancy,
    jobType,
    logo: logoUrl,
    postedBy,
  });

  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});

// Get jobs posted by current user
export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

// Update a job (allow updating new fields)
export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }

  // Only allow updating allowed fields
  const allowedFields = [
    "title",
    "description",
    "category",
    "country",
    "city",
    "location",
    "fixedSalary",
    "salaryFrom",
    "salaryTo",
    "company",
    "vacancy",
    "jobType",
    "logo",
    "expired",
  ];
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  job = await Job.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Job Updated!",
    job,
  });
});

// Delete a job
export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});

// Get a single job (with all fields)
export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});
