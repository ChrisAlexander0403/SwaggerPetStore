import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import Pet from '../models/pet.model';

const prisma = new PrismaClient();

export async function insertPet(req: Request, res: Response) {
    const pet: Pet = req.body;
    if (!pet.name) return res.status(400).send("Bad request")
    try {
        const inserted = await prisma.pet.create({
            data: {
                name: pet.name,
                tag: pet.tag
            }
        });
        return res.status(201).json(inserted);
    } catch {
        res.status(500).send("Something went wrong");
    }
}

export async function getPets(req: Request, res: Response) {
    try {
        const pets = await prisma.pet.findMany();
        res.status(200).json({ pets });
    } catch {
        res.status(500).send("Something went wrong");
    }
}

export async function getPet(req: Request, res: Response) {
    try {
        const pets = await prisma.pet.findUnique({
            where: {
                id: req.body.pet
            }
        });
        res.status(200).json({ pets });
    } catch {
        res.status(500).send("Something went wrong");
    }
}