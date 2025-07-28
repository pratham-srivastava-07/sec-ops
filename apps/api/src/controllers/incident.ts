import { CreateIncidentInput, prismaClient, updateIncidentSchema, UpdateIncident } from "@ops/shared"
import { createIncidentSchema } from "@ops/shared"

export default async function createIncidentController(req: any, res: any): Promise<any> {
  try {
    const parsed = createIncidentSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors
      })
    }

    const incidentData = parsed.data as Required<CreateIncidentInput>

    const newIncident = await prismaClient.incident.create({
      data: incidentData
    })

    return res.status(201).json({
      message: `Incident report created successfully`,
      report: newIncident
    })

  } catch (error: any) {
    console.error(`Error occurred while creating an incident: ${error}`)
    return res.status(500).json({ message: "Internal server error" })
  }
}


export async function getAllIncidentController(req: any, res: any): Promise<any> {
  try {
      const limit =  req.query.limit ? parseInt(req.query.limit as string, 10) : undefined
      const allIncidents = await prismaClient.incident.findMany({
        take: limit,
        orderBy: {
          createdAt: "desc"
        }
      })

      return res.status(200).json({
        message: `Fetched all incidents successfully`,
        result: allIncidents
      })
  } catch(error: any) {
      console.log(`Error fetching all incidents ${error}`)
      return res.status(500).json({
        message: "Internal server error"
      })
  }
}

export  async function getSpecificIncident(req: any, res: any): Promise<any> {
    const { id } = req.query
    try {
        if(!id) {
          return res.status(400).json({
              message: `No id found with ${id}`
          })
        }

        const incident = await prismaClient.incident.findFirst({
          where: {
            id: id
          }
        })

        return res.status(200).json({
          message: `Fetched incident with id ${id}`,
          result: incident
        })
    } catch(e: any) {
        console.log(`Could not fetch incident with id ${id}`)
        return res.status(500).json({
          message: `Internal server error`
        })
    }
}

export async function updateIncidentController(req: any, res: any): Promise<any> {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid incident ID" });
  }

  const parsed = updateIncidentSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const parsedIncidentData = parsed.data as UpdateIncident;

  try {
    const updateIncident = await prismaClient.incident.update({
      where: { id },
      data: parsedIncidentData,
    });

    return res.status(200).json({ message: "Incident updated", incident: updateIncident });
  } catch (error: any) {
    console.error("Error updating incident:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Incident not found" });
    }

    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

export async function deleteIncidentController(req: any, res: any): Promise<any> {
    const { id } = req.query;

    try {
        const deleteIncident = await prismaClient.incident.delete({
            where: {
                id: id
            }
        })

        return res.status(200).json({
            message: `Incident with id ${id} deleted successfully`,
            result: deleteIncident
        })
    } catch(error: any) {
        console.log(`Error deleting incident with id ${id}`)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export async function deleteAllController(req: any, res: any): Promise<any> {
    try  {
      const deletAll = await prismaClient.incident.deleteMany({})
      return res.status(200).json({
          message: `All incidents deleted successfully`,
          result: deletAll
      })
    } catch(error: any) {
        console.log(`Error occured deleting incidents`)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

