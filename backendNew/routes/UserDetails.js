const express  = require("express")
const { getAllUserDetails, addUserDetails, editUserDetails, deleteUserDetails, getSingleUserDetails, createBooking } = require("../controllers/UserDetails")
const router = express.Router()
const upload = require("../middlewares/multer")

router.get('/',getAllUserDetails);
router.post('/add',upload.single('image'),addUserDetails);
router.patch('/:id',upload.single('image'),editUserDetails);
router.delete('/:id',deleteUserDetails);
router.get('/:id',getSingleUserDetails);
router.post('/bookingdetails',createBooking);

module.exports = router