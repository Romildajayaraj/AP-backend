import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAdminDashboard = async (req, res) => {
  try {
    // Get statistics
    const totalAuctions = await Product.countDocuments();
    const activeAuctions = await Product.countDocuments({
      itemEndDate: { $gt: new Date() },
    });
    const totalUsers = await User.countDocuments();
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });

    // Get recent active auctions for display
    const recentActiveAuctions = await Product.find({
      itemEndDate: { $gt: new Date() },
    })
      .populate("seller", "name email")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const formattedRecentActiveAuctions = recentActiveAuctions.map(
      (auction) => ({
        ...auction,
        itemPhoto: auction.itemImage?.url || "",
      }),
    );

    // Get recent users for display
    const recentUsersList = await User.find({})
      .select("name email role createdAt lastLogin location avatar")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      stats: {
        activeAuctions,
        totalAuctions,
        totalUsers,
        recentUsers,
      },
      recentAuctions: formattedRecentActiveAuctions,
      recentUsersList: recentUsersList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching admin dashboard data",
      error: error.message,
    });
  }
};

export const getAllAuctions = async (req, res) => {
  console.log("getAllAuctions called");

  try {
    const auctions = await Product.find({})
      .populate("seller", "name email")
      .sort({ createdAt: -1 })
      .lean();

    const formattedAuctions = auctions.map((auction) => ({
      ...auction,
      itemPhoto: auction.itemImage?.url || "",
    }));

    res.status(200).json({
      success: true,
      auctions: formattedAuctions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Get pagination parameters from query string
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const role = req.query.role || "";

    // Whitelist sortable fields to prevent sorting by sensitive fields like password
    const allowedSortFields = [
      "createdAt",
      "name",
      "email",
      "role",
      "lastLogin",
    ];
    const sortBy = allowedSortFields.includes(req.query.sortBy)
      ? req.query.sortBy
      : "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build search query — escape regex special chars to prevent ReDoS
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchQuery = escapedSearch
      ? {
          $or: [
            { name: { $regex: escapedSearch, $options: "i" } },
            { email: { $regex: escapedSearch, $options: "i" } },
          ],
        }
      : {};

    // Apply role filter if provided
    const roleFilter = role && ["user", "admin"].includes(role) ? { role } : {};

    const query = { ...searchQuery, ...roleFilter };

    // Get total count for pagination info
    const totalUsers = await User.countDocuments(query);

    // Get users with pagination, search, and sorting
    const users = await User.find(query)
      .select("name email role createdAt signupAt lastLogin location avatar")
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    // Calculate pagination info
    const totalPages = Math.ceil(totalUsers / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          limit,
          hasNextPage,
          hasPrevPage,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    if (!["active", "blocked"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      message: "User status updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;

    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        role,
      },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      message: "Role updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
