
const config = require('./db.config.js')

// Create or Update users
const createOrUpdate = async (data = {},update = false) =>{
    let params;

    if(update){
        params= {
            TableName: config.Table,
            Item: {
                ...data,
                modifiedTime: new Date().toLocaleString(),
            }
        }
    }else{
        params= {
            TableName: config.Table,
            Item: {
                id: new Date().valueOf(),
                uploadedTime: new Date().toLocaleString(),
                modifiedTime: new Date().toLocaleString(),
                ...data
            }
        }
    }
    console.log(params)  

    try{
        await config.db.put(params).promise()
        return { success: true }
    } catch(error){
        console.log(error)
        return { success: false}
    }
}

// Read all users
const readList = async(userId)=>{
    console.log(userId)
    const params = {
        TableName: config.Table
    }

    console.log(params)

    try{
        const admin=["67125ghmqwfd623fdquw"]
        const { Items = [] } = await config.db.scan(params).promise()
        console.log(Items)

        if(admin.includes(userId)){
            return { success: true, data: Items }
        }else{
            console.log('hey')
             const filteredData= Items.filter((eachItem)=>eachItem.userId===userId)
             return { success: true, data: filteredData }
        }

    } catch(error){
        return { success: false, data: null }
    }

}



// Delete User by ID
const deleteById = async(value ) => { 
    const params = {
        TableName: config.Table,
        Key: {
            id: parseInt(value)
        }
    }
    console.log(params)    
    try {
        await config.db.delete(params).promise()
        return {  success: true }

    } catch (error) {
        console.log(error)
        return{ success: false }
    }
}


module.exports =  {
    createOrUpdate,
    readList,
    deleteById
}