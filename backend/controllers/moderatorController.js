import mongoose from 'mongoose';
import User from '../models/userModel.js';

export const addActionToUser = async (req, res, next) => {
    try {
      const { id, action } = req.body;
  
      // Validate ID and action
      if (!id || !action) {
        return res.status(400).json({
          success: false,
          message: 'ID and action are required',
        });
      }
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID',
        });
      }
  
      const validActions = ['WARNING', 'SUSPENSION', 'BAN'];
      if (!validActions.includes(action)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid action',
        });
      }
  
      // Add the action to the user's actions array
      const user = await User.findByIdAndUpdate(
        id,
        { $push: { actions: action } },
        { new: true, runValidators: true }
      );
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: `Action "${action}" added successfully for ${user.email}`,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
  