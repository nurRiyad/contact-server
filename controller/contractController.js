import { Contract } from '../models/contract.js'

export const getAllContract = async (req, res, next) => {
  const newc = new Contract({ username: 'rsdf', phone: 'sdf' })

  newc.save().then(() => {
    res.send('Data Saved')
  })
  // res.send('Get All Contract')
}

export const getAContract = async (req, res) => {
  res.send('Get All Contract')
}

export const createContract = async (req, res) => {
  res.send('Get All Contract')
}
export const updateAContract = async (req, res) => {
  res.send('Get All Contract')
}
export const deleteAContract = async (req, res) => {
  res.send('Get All Contract')
}
