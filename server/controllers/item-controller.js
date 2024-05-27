// item-controller.js

import Item from '../model/Item.js';
import User from '../model/User.js';
import CreateSource from '../model/createSource.js'

export const getAllItems = async (req, res) => {
  const {userId}=req.body

  try {
    const items = await Item.find({ user: userId });
    const sources=await CreateSource.find({ueser:userId}) ;// Assuming user field in Item model

    res.json({ items ,sources});
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addItem = async (req, res) => {
  const { selectedValue, note, amount, user: userId } = req.body; // Renamed user to userId
  try {
    // First, find the user by ID
    const foundUser = await User.findById(userId); // Renamed user to foundUser
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new item associated with the user
    const item = new Item({
      selectedValue,
      note,
      amount,
      userId: foundUser._id // Assign the user ID to the item
    });

    // Save the item
    await item.save();

    // Push the item to the user's items array and save the user
    foundUser.items.push(item); // Renamed user to foundUser
    await foundUser.save();

    res.status(201).json({ message: 'Item created successfully', item });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createSource = async (req, res) => {
  const { selectedOption, textInput,user: userId , groupId } = req.body;

  try {
    const foundUser = await User.findById(userId); // Renamed user to foundUser
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Create a new CreateSource document
    const newCreateSource = new CreateSource({
      selectedOption,
      textInput,
      userId: foundUser._id ,
      groupId // Make sure to include groupId
    });

    // Save the new CreateSource document to the database
    const savedCreateSource = await newCreateSource.save();

    res.status(200).json({ message: 'CreateSource added successfully', createSource: savedCreateSource });
  } catch (error) {
    console.error('Error adding createsource:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
