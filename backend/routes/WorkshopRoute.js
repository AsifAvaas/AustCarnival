const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Workshop = require('../models/Workshop')
const WorkshopStudent = require('../models/WorkshopStudent')
const User = require('../models/User')

router.post('/workshop/all', async (req, res) => {
    try {
        const workshops = await Workshop.find({});
        return res.json(workshops);

    } catch (e) {
        return res.status(401).json({ "msg": "couldnt find" })
    }
})
router.post('/workshop', async (req, res) => {
    try {
        const workshops = await Workshop.find({ isApproved: true });
        return res.json(workshops);

    } catch (e) {
        return res.status(401).json({ "msg": "couldnt find" })
    }
})

router.post('/workshop/create', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);
        await Workshop.create({
            email: req.body.email,
            password: securedPassword,
            isApproved: false,
            isAdmin: false,
            name: "",
            body: "",
            date: "",
            profile_pic: ""
        })
        res.json({ success: true });
    } catch (e) {
        console.error(e);
        res.json({ success: false, error: e.message });
    }
})
router.delete('/workshop/delete/:id', async (req, res) => {
    try {
        const workshopId = req.params.id;
        const deletedWorkshop = await Workshop.findByIdAndDelete(workshopId);
        if (deletedWorkshop) {
            res.status(200).json({ success: true, message: 'Instructor deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Instructor not found' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the instructor' });
    }
})
router.put('/toggleapproval/:id', async (req, res) => {
    try {
        const { isApproved } = req.body;
        const user = await Workshop.findByIdAndUpdate(req.params.id, { isApproved }, { new: true });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});



router.post('/workshop/profile', async (req, res) => {
    const id = req.body.id
    try {
        let user = await Workshop.findById(id);

        res.json({ profileInfo: user })

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

router.post('/workshop/student/signup', async (req, res) => {
    const studentname = await User.findOne({ email: req.body.studentEmail })
    console.log(studentname.name)
    try {
        await WorkshopStudent.create({
            WorkshopName: req.body.WorkshopName,
            hostName: req.body.hostName,
            studentName: studentname.name,
            studentEmail: req.body.studentEmail,
            date: req.body.date
        })
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error: error.message });
    }
})

router.post('/workshop/instructor', async (req, res) => {

    try {
        let workshop = await WorkshopStudent.find({ WorkshopName: req.body.workshopName })
        if (workshop) {
            res.json({ success: true, data: workshop });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, error: error.message });
    }
})

router.post('/workshop/student/find', async (req, res) => {

    try {
        let workshop = await WorkshopStudent.find({ studentEmail: req.body.email })
        if (workshop) {
            res.json({ success: true, data: workshop });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, error: error.message });
    }
})




router.put('/workshop/profile/update', async (req, res) => {
    const id = req.body.id
    try {
        let user = await Workshop.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        user.profile_pic = req.body.image
        user.name = req.body.name
        user.description = req.body.body
        user.date = req.body.date
        user.job = req.body.job
        user.workshop = req.body.workshop


        if (req.body.password !== user.password) {
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = securedPassword
            console.log("password updated")
        }

        await user.save()
        res.json({ profileInfo: user })

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
    // let updatedFields = { name, email, job, description, date, profile_pic, workshop };

    // if (password) {
    //     const salt = await bcrypt.genSalt(10);
    //     updatedFields.password = await bcrypt.hash(password, salt);
    // }

    // try {
    //     const updatedWorkshop = await Workshop.findByIdAndUpdate(
    //         id,
    //         updatedFields,
    //         { new: true }
    //     );
    //     if (!updatedWorkshop) {
    //         return res.status(404).send("Workshop not found");
    //     }
    //     res.json({ msg: "Profile updated successfully", updatedWorkshop });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send("Server Error");
    // }
});



module.exports = router;