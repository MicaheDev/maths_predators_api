import axios from "axios";

const owner: string = "MicaheDev";
const repo: string = "maths_predator_courses";
const path: string = "es/contents";
const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents${path}`;
const token = "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";
const url = `https://raw.githubusercontent.com/${owner}/${repo}/master/es/contents`

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
          name: "Fundamentos de Matemáticas",
          path: "es/contents/part1",
          description: await getMarkdown(
            `${url}/part1/index.md`
          ),
          previewImage: await getResource(
            `${baseUrl}/part1/preview.png?ref=master`
          ),
          subParts: [
            {
              subPart: "a",
              name: "Teoria de los Numeros",
              description: await getMarkdown(
                `${url}/part1/a/index.md`
              ),
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
          id: "part2",
          name: "Álgebra Elemental",
          path: "es/contents/part2",
          description: await getMarkdown(
            `${url}/part2/index.md`
          ),
          previewImage: await getResource(
            `${baseUrl}/part2/preview.png?ref=master`
          ),
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
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
      },
      responseType: "text",
    });
    return response.data;
  } catch (error) {
    return { error: error };
  }
}

export const CoursesController = {
  async handleGetCourses(_req: any, res: any) {
    // Obtener los cursos desde la caché o realizar una nueva solicitud si no están en caché
    const coursesES = await getCoursesES();
    res.json(coursesES);
  },

  async handleGetCoursesByPart(req: any, res: any) {
    const { partParam } = req.params;
    const coursesES = await getCoursesES();
    const coursePart = coursesES.find((part: any) => part.id === partParam);
    if (coursePart) {
      res.json(coursePart);
    } else {
      res.status(404).json({ error: "Part not found" });
    }
  },
};
