import { CreateIncidentInput, prismaClient } from "@ops/shared"
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