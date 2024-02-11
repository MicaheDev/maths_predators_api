import axios from "axios";
import setting from "../config/settings";

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
          part: "part 1",
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
                  content: await getMarkdown(
                    `${url}/part1/a/1_numeros_naturales.md`
                  ),
                },
              ],
            },
          ],
        },
        {
          part: "part 2",
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
                  content: await getMarkdown(
                    `${url}/part2/a/1_variables.md`
                  ),
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
    console.log(error);

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
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export const CoursesController = {
  async handleGetCourses(_req: any, res: any, next: any) {
    try {
      // Obtener los cursos desde la caché o realizar una nueva solicitud si no están en caché
      const coursesES = await getCoursesES();
      res.json(coursesES);
    } catch (error) {
      next(error);
    }
  },

  async handleGetCoursesByPart(req: any, res: any, next: any) {
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
      next(error);
    }
  },

  async handleGetCourseBySubPart(req: any, res: any, next: any) {
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
      next(error);
    }
  },
};
