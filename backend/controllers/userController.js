import User from '../models/userModel.js'; // Ensure this import is correct

// Function to handle the /profile route
export const getProfile = async (req, res, next) => {
  try {
   
    const userId = req.params.id;
    // Check if the user ID is provided
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    // Find the user by ID in the database
    const person = await User.findById(userId);

    // Check if the user exists
    if (!person) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Respond with the user's data
    res.status(200).json({
      success: true,
      data: person,
    });
  } catch (error) {
    // Handle errors
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
