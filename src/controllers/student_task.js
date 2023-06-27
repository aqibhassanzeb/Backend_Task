import { Task } from "../models/task.js";



export const createTask = async(req, res) => {
    const { title, description, assign_to, created_by } = req.body
    if (!title || !description || !assign_to || !created_by) {
        return res.status(422).json({ error: "please fill all the fields ",success:false })
    }
    try {   
            const task = new Task(req.body)
            let saved_task = task.save()
            if(saved_task){
                  res.json({ message: "created successfully",success:true })
            }
            } catch (error) {
                return res.status(400).json({ error: 'something went wrong !',success:false })
            }
}



export const updateTask = async(req, res) => {
    const { _id } = req.params

    try {
        await Task.findByIdAndUpdate({ _id }, req.body)
        res.json({ message: "updated successfully",success:true })
    } catch (error) {
        res.status(400).json({ error: "something went wrong!",success:false })

    }
       
}


export const taskShow = async (req, res) => {
    let filter = { isActive: true }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip_index = (page - 1) * limit;
    if (req.query._id) {
        filter._id = req.query._id.split(',')
    }
    if (req.query.created_by) {
        filter.created_by = req.query.created_by.split(',')
    }
    if (req.query.assign_to) {
        filter.assign_to = req.query.assign_to
    }
    if (req.query.isActive) {
        filter.isActive = req.query.isActive

    }
    try {
        const result = await Task.find(filter).skip(skip_index).limit(limit).populate("assign_to", 'name email status').populate("created_by",'name email status')
        const count = await Task.countDocuments();
        res.json({ data: result, count, per_page: limit,success:true })
    } catch (error) {
        res.status(400).json({ error: "something went wrong!",success:false })

    }

}