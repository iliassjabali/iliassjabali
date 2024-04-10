import { format, formatDistanceToNow, parseISO } from "date-fns";
import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags?: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterLines = match![1]?.trim().split("\n");
  const metadata: Partial<Metadata> = {};
  frontMatterLines?.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key?.trim() as keyof Metadata] = value;
  });

  return {
    metadata,
    content: fileContent.replace(frontmatterRegex, "").trim(),
  };
}

const getMDXFiles = (dir: fs.PathLike) =>
  fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");

const readMDXFile = (filePath: fs.PathOrFileDescriptor) =>
  parseFrontmatter(fs.readFileSync(filePath, "utf-8"));

const getMDXData = (dir: string) =>
  getMDXFiles(dir).map((file) => ({
    ...readMDXFile(path.join(dir, file)),
    slug: path.basename(file, path.extname(file)),
  }));

export const getBlogPosts = () =>
  getMDXData(path.join(process.cwd(), "src", "app", "yap", "posts"));

export const formatDate = (
  dateString: string | null | Date,
  includeRelative = false,
) => {
  const targetDate = parseISO(new Date(dateString ?? "").toISOString());
  const fullDate = format(targetDate, "MMM d, yy");
  if (!includeRelative) {
    return fullDate;
  }
  return `${fullDate} (${formatDistanceToNow(targetDate, { addSuffix: true })})`;
};
