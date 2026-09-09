import { metadataFor } from "@/lib/site-metadata";
import { KoreanBuildLogPage } from "@/components/korean-pages";

export const metadata = metadataFor(
  "/ko/build-log",
  "빌드 로그",
  "연구 시스템에서 완료된 capability, 근거, 남아 있는 경계를 기록한 한국어 engineering log.",
);

export default KoreanBuildLogPage;
