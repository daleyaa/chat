import {
  findUserByUsername,
  createUser,
  generateHash,
  verifyHash,
  findUserById,
  getAllUsers,
  deleteUser,
  updateUser,
  userChats,
} from '../services/userServices'
import { Request, Response } from 'express'
import { generateToken } from '../util/jwtUtils'

//signup
export async function signupController(req: Request, res: Response) {
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.username ||
      !req.body.password
    ) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    const conflictUser = await findUserByUsername(req.body.username)
    if (conflictUser) {
      return res.status(409).json({ message: 'Conflict' })
    }

    const passwordHashed = await generateHash(req.body.password)
    if (passwordHashed) {
      const user = await createUser(
        req.body.firstName,
        req.body.lastName,
        req.body.username,
        passwordHashed,
        req.body.age,
      )
      const jwt = generateToken({
        id: user.id,
        username: user.username,
        password: user.password,
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...dataUser } = user
      Object.assign(dataUser, { jwt: jwt })
      return res.status(201).json(dataUser)
    }
    return res.status(500).json({ message: 'Internal Server Error' })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

//login
export async function loginController(req: Request, res: Response) {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: 'Bad Request' })
    }

    const user = await findUserByUsername(req.body.username)
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' })
    }

    const isPasswordMatched = await verifyHash(req.body.password, user.password)
    if (!isPasswordMatched) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const jwt = generateToken({
      id: user.id,
      username: user.username,
      password: user.password,
    })
    return res.status(201).json({ jwt })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export async function findUserController(req: Request, res: Response) {
  try {
    if (Number(req.params.id) < 0) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    const user = await findUserById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' })
    }
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export async function getAllUsersController(req: Request, res: Response) {
  try {
    if (!req.query.offset || !req.query.limit) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    const users = await getAllUsers(
      Number(req.query.offset),
      Number(req.query.limit),
    )
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'User Not Found' })
    }
    return res.status(200).json({ users })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export async function deleteUserController(req: Request, res: Response) {
  try {
    if (Number(req.params.id) < 0) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    const result = await deleteUser(req.params.id)
    if (!result.affected) {
      return res.status(404).json({ message: 'User Not Found' })
    }
    return res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export async function changeDataController(req: Request, res: Response) {
  try {
    if (Number(req.params.id) < 0 || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    if (req.body.username) {
      const conflictUser = await findUserByUsername(req.body.username)
      if (conflictUser) {
        return res.status(409).json({ message: 'Conflict' })
      }
    }
    const user = await findUserById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' })
    }
    const newUser = await updateUser(user, req.body)
    return res.status(200).json({ newUser })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export async function getAllChatsUserController(req: Request, res: Response) {
  try {
    if (Number(req.params.id) < 0) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    const users = await userChats(Number(req.params.id))

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'User Not Found' })
    }
    return res.status(200).json({ users })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
