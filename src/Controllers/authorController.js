const authorModel = require("../Models/authorModel")

const createAuthor = async function (req, res) {
    try {
        let author = req.body
        let{fname,lname,title,email,password} = author
        if(!fname){return res.status(400).send({msg:"fname is required"})}
        if(!lname){return res.status(400).send({msg:"lname is required"})}
        if(!title){return res.status(400).send({msg:"title is required"})}
        if(!email){return res.status(400).send({msg:"email is required"})}
        if(!password){return res.status(400).send({msg:"password is required"})}
        
        let findEmail = await authorModel.findOne({email})

        if (findEmail) {
           return res.status(400).send({ msg: "email id already exsits" })
        }
        let validEmail = function (mail) 
        {
         return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        }
        if (!validEmail(email)) return res.status(400).send({status:false, msg:"email is not valid"})
        
      
            let authorCreated = await authorModel.create(author)
            return res.status(201).send(authorCreated)
        


    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}

module.exports.createAuthor = createAuthor