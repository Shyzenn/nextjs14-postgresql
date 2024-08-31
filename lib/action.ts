"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

// Define a schema using Zod to validate the employee data
const EmployeeSchema = z.object({
  name: z.string().min(6, "Name must contain at least 6 characters"),
  email: z
    .string()
    .email("Invalid email")
    .min(6, "Email must contain at least 6 characters"),
  phone: z.string().min(11, "Phone number must contain at least 11 digits"),
});

// create employee
export const saveEmployee = async (prevState: any, formData: FormData) => {
  // Convert FormData entries to an object and validate it against the schema
  const validatedFields = EmployeeSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  // If validation fails, return the validation errors to be displayed in the form
  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.employee.create({
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        phone: validatedFields.data.phone,
      },
    });
  } catch (err) {
    // If an error occurs during saving, return an error message
    return { message: "Failed to create new employee" };
  }

  revalidatePath("/employee");
  redirect("/employee");
};

export const getEmployeeList = async () => {
  try {
    const employees = await prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return employees;
  } catch (error) {
    throw new Error("Failed to fetch employees data");
  }
};

export const getEmployeeById = async (id: string) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
    });
    return employee;
  } catch (error) {
    throw new Error("Failed to fetch contact data");
  }
};

export const updateEmployee = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  const validatedFields = EmployeeSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.employee.update({
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        phone: validatedFields.data.phone,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update employee" };
  }

  revalidatePath("/employee");
  redirect("/employee");
};

export const deleteEmployee = async (id: string) => {
  try {
    await prisma.employee.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete employee" };
  }

  revalidatePath("/employee");
};
