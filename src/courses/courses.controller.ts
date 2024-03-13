import axios from "axios";
import setting from "../config/settings";
import { Request, Response } from "express";

const baseUrl = `https://api.github.com/repos/${setting.OWNER}/${setting.REPO}/contents/es/contents`;
const url = `https://raw.githubusercontent.com/${setting.OWNER}/${setting.REPO}/master/es/contents`;

let cachedCoursesES: any = null;

async function getCoursesES() {
  if (cachedCoursesES) {
    // Si los cursos están en caché, devolverlos directamente
    return cachedCoursesES;
  } else {
    try {
      // Realizar una nueva solicitud para obtener los cursos
      const coursesES = [
        {
          part: "parte 1",
          id: "part1",
          color: "red",
          name: "Fundamentos de Matemáticas",
          path: "es/contents/part1",
          description: await getMarkdown(`${url}/part1/index.md`),
          previewImage: await getResource(
            `${baseUrl}/part1/preview.png?ref=master`
          ),
          subParts: [
            {
              subPart: "a",
              name: "Teoria de los Numeros",
              description: await getMarkdown(`${url}/part1/a/index.md`),
              contents: [
                {
                  title: "Numeros naturales",
                  id: "numeros_naturales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_naturales",
                  content: await getMarkdown(
                    `${url}/part1/a/1_numeros_naturales.md`
                  ),
                },
                {
                  title: "Numeros enteros",
                  id: "numeros_enteros",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_enteros",
                  content: await getMarkdown(
                    `${url}/part1/a/2_numeros_enteros.md`
                  ),
                },
                {
                  title: "Numeros racionales",
                  id: "numeros_racionales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_racionales",
                  content: await getMarkdown(
                    `${url}/part1/a/3_numeros_racionales.md`
                  ),
                },
                {
                  title: "Numeros reales",
                  id: "numeros_reales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_reales",
                  content: await getMarkdown(
                    `${url}/part1/a/4_numeros_reales.md`
                  ),
                },
              ],
            },
            {
              subPart: "b",
              name: "Operaciones Básicas",
              description: await getMarkdown(`${url}/part1/b/index.md`),
              contents: [
                {
                  title: "Suma",
                  id: "suma",
                  path: "es/contents/part1/operaciones_basicas/suma",
                  content: await getMarkdown(
                    `${url}/part1/b/1_suma.md`
                  ),
                },
                {
                  title: "Resta",
                  id: "resta",
                  path: "es/contents/part1/operaciones_basicas/resta",
                  content: await getMarkdown(
                    `${url}/part1/b/2_resta.md`
                  ),
                },
                {
                  title: "Multiplicación",
                  id: "multiplicacion",
                  path: "es/contents/part1/operaciones_basicas/multiplicacion",
                  content: await getMarkdown(
                    `${url}/part1/b/3_multiplicacion.md`
                  ),
                },
                {
                  title: "División",
                  id: "division",
                  path: "es/contents/part1/operaciones_basicas/division",
                  content: await getMarkdown(
                    `${url}/part1/b/4_division.md`
                  ),
                },
              ],
            },
            /*
            {
              subPart: "c",
              name: "Propiedades de las operaciones aritméticas",
              description: await getMarkdown(`${url}/part1/a/index.md`),
              contents: [
                {
                  title: "Numeros naturales",
                  id: "numeros_naturales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_naturales",
                  content: await getMarkdown(
                    `${url}/part1/c/1_numeros_naturales.md`
                  ),
                },
                {
                  title: "Numeros enteros",
                  id: "numeros_enteros",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_enteros",
                  content: await getMarkdown(
                    `${url}/part1/c/2_numeros_enteros.md`
                  ),
                },
                {
                  title: "Numeros racionales",
                  id: "numeros_racionales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_racionales",
                  content: await getMarkdown(
                    `${url}/part1/c/3_numeros_racionales.md`
                  ),
                },
                {
                  title: "Numeros reales",
                  id: "numeros_reales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_reales",
                  content: await getMarkdown(
                    `${url}/part1/c/4_numeros_reales.md`
                  ),
                },
              ],
            },
            {
              subPart: "d",
              name: "Orden de operaciones (PEMDAS/BODMAS)",
              description: await getMarkdown(`${url}/part1/a/index.md`),
              contents: [
                {
                  title: "Numeros naturales",
                  id: "numeros_naturales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_naturales",
                  content: await getMarkdown(
                    `${url}/part1/a/1_numeros_naturales.md`
                  ),
                },
                {
                  title: "Numeros enteros",
                  id: "numeros_enteros",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_enteros",
                  content: await getMarkdown(
                    `${url}/part1/a/2_numeros_enteros.md`
                  ),
                },
                {
                  title: "Numeros racionales",
                  id: "numeros_racionales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_racionales",
                  content: await getMarkdown(
                    `${url}/part1/a/3_numeros_racionales.md`
                  ),
                },
                {
                  title: "Numeros reales",
                  id: "numeros_reales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_reales",
                  content: await getMarkdown(
                    `${url}/part1/a/4_numeros_reales.md`
                  ),
                },
              ],
            },
            {
              subPart: "e",
              name: "Números primos y compuestos",
              description: await getMarkdown(`${url}/part1/a/index.md`),
              contents: [
                {
                  title: "Numeros naturales",
                  id: "numeros_naturales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_naturales",
                  content: await getMarkdown(
                    `${url}/part1/a/1_numeros_naturales.md`
                  ),
                },
                {
                  title: "Numeros enteros",
                  id: "numeros_enteros",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_enteros",
                  content: await getMarkdown(
                    `${url}/part1/a/2_numeros_enteros.md`
                  ),
                },
                {
                  title: "Numeros racionales",
                  id: "numeros_racionales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_racionales",
                  content: await getMarkdown(
                    `${url}/part1/a/3_numeros_racionales.md`
                  ),
                },
                {
                  title: "Numeros reales",
                  id: "numeros_reales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_reales",
                  content: await getMarkdown(
                    `${url}/part1/a/4_numeros_reales.md`
                  ),
                },
              ],
            }, 
            {
              subPart: "f",
              name: "Factores y múltiplos",
              description: await getMarkdown(`${url}/part1/a/index.md`),
              contents: [
                {
                  title: "Numeros naturales",
                  id: "numeros_naturales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_naturales",
                  content: await getMarkdown(
                    `${url}/part1/a/1_numeros_naturales.md`
                  ),
                },
                {
                  title: "Numeros enteros",
                  id: "numeros_enteros",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_enteros",
                  content: await getMarkdown(
                    `${url}/part1/a/2_numeros_enteros.md`
                  ),
                },
                {
                  title: "Numeros racionales",
                  id: "numeros_racionales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_racionales",
                  content: await getMarkdown(
                    `${url}/part1/a/3_numeros_racionales.md`
                  ),
                },
                {
                  title: "Numeros reales",
                  id: "numeros_reales",
                  path: "es/contents/part1/teoria_de_los_numeros/numeros_reales",
                  content: await getMarkdown(
                    `${url}/part1/a/4_numeros_reales.md`
                  ),
                },
              ],
            },
            */
            
          ],
        },
        {
          part: "parte 2",
          color: "green",
          id: "part2",
          name: "Álgebra Elemental",
          path: "es/contents/part2",
          description: await getMarkdown(`${url}/part2/index.md`),
          previewImage: await getResource(
            `${baseUrl}/part2/preview.png?ref=master`
          ),
          subParts: [
            {
              subPart: "a",
              name: "Concepto de variable y expresiones algebraicas",
              description: await getMarkdown(`${url}/part2/a/index.md`),
              contents: [
                {
                  title: "Variables",
                  id: "variables",
                  path: "es/contents/part2/concepto_de_variable_y_expresiones_algebraicas/variables",
                  content: await getMarkdown(`${url}/part2/a/1_variables.md`),
                },
              ],
            },
          ],
        },
      ];

      // Guardar los cursos en la caché y establecer un tiempo de expiración (1 día)
      cachedCoursesES = coursesES;
      setTimeout(() => {
        cachedCoursesES = null; // Limpiar la caché después de un día
      }, 24 * 60 * 60 * 1000);

      return coursesES;
    } catch (error) {
      return { error: error };
    }
  }
}

async function getResource(url: string) {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${setting.TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    return { error: error };
  }
}

async function getMarkdown(url: string) {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${setting.TOKEN}`,
      },
      responseType: "text",
    });
    return response.data;
  } catch (error: any) {
    return { error: error };
  }
}

export const CoursesController = {
  async handleGetCourses(_req: Request, res: Response) {
    try {
      // Obtener los cursos desde la caché o realizar una nueva solicitud si no están en caché
      const coursesES = await getCoursesES();
      res.json(coursesES);
    } catch (error) {
      res.json(error);
    }
  },

  async handleGetCoursesByPart(req: Request, res: Response) {
    try {
      const { partParam } = req.params;
      const coursesES = await getCoursesES();
      const coursePart = coursesES.find((part: any) => part.id === partParam);
      if (coursePart) {
        res.json(coursePart);
      } else {
        res.status(404).json({ error: "Part not found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async handleGetCourseBySubPart(req: Request, res: Response) {
    try {
      const { partParam } = req.params;
      const { subPartParam } = req.params;
      const coursesES = await getCoursesES();
      const coursePart = coursesES.find((part: any) => part.id === partParam);
      if (coursePart.subParts) {
        const subPart = coursePart.subParts.find(
          (subPart: any) =>
            subPart.name.replace(/ /g, "_").toLowerCase() === subPartParam
        );

        if (subPart) {
          res.json(subPart);
        } else {
          res.status(404).json({ error: "Part not found" });
        }
      } else {
        res.status(404).json({ error: "Part not found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async handleGetCourseByContentPart(req: Request, res: Response) {
    try {
      const { partParam } = req.params;
      const { subPartParam } = req.params;
      const { contentPart } = req.params;
      const coursesES = await getCoursesES();
      const coursePart = coursesES.find((part: any) => part.id === partParam);
      if (coursePart.subParts) {
        const subPart = coursePart.subParts.find(
          (subPart: any) =>
            subPart.name.replace(/ /g, "_").toLowerCase() === subPartParam
        );

        if (subPart) {
          const lastPart = subPart.contents.find(
            (subTheme: any) =>
              subTheme.title.replace(/ /g, "_").toLowerCase() === contentPart
          );

          if (lastPart) {
            res.json(lastPart);
          } else {
            res.status(404).json({ error: "Part not found" });
          }
        } else {
          res.status(404).json({ error: "Part not found" });
        }
      } else {
        res.status(404).json({ error: "Part not found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async handleSearchCourses(req: Request, res: Response) {
    try {
      const { searchQuery } = req.params;
      const coursesES = await getCoursesES();

      // Filtrar los cursos y subcursos que contienen el término de búsqueda en su nombre o descripción
      const results = coursesES.filter((course: any) => {
        // Buscar en el nombre del curso
        if (course.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return true;
        }
        // Buscar en la descripción del curso
        if (
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return true;
        }
        // Buscar en las subpartes y sus contenidos
        return course.subParts.some((subPart: any) => {
          if (subPart.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return true;
          }
          return subPart.contents.some((content: any) => {
            return content.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          });
        });
      });

      res.json(results);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
