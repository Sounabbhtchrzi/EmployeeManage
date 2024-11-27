


// Function to handle the /profile route
export const getProfile = (req, res, next) => {
    try {
      // Retrieve the authenticated user from the request
      const person = req.user;
  
      // Check if the user exists
      if (!person) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: User not authenticated',
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
  

  