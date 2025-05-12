import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  middleName: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  yearLevel: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  timestamps: true
});

// Create index for faster queries
studentSchema.index({ studentId: 1, email: 1 });

const Student = mongoose.model('Student', studentSchema);

export default Student; 