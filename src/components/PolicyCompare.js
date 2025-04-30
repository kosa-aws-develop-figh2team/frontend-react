import React from "react";
import { 
  Box, 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material';

// 비교할 항목을 FIELDS에 정의
const FIELDS = [
  { key: "sprtTrgtCn", label: "지원대상" },
  { key: "wlfareInfoReldCn", label: "문의처 연락처" },
  { key: "wlfareInfoReldNm", label: "문의처 이름" },
  { key: "aplyMtdCn", label: "신청방법" },
  { key: "alwServCn", label: "지원내용" },
  { key: "basfrmList", label: "관련 자료 링크" }
];

// 각 정책에서 비교 항목 값을 추출하는 함수
function getFieldValue(policy, key) {
  if (!policy || !policy.json || !policy.json.wantedDtl) return "-";
  const wantedDtl = policy.json.wantedDtl;
  switch (key) {
    case "sprtTrgtCn":
      return wantedDtl.sprtTrgtCn || "-";
    case "wlfareInfoReldCn":
      return wantedDtl.inqplCtadrList?.wlfareInfoReldCn || "-";
    case "wlfareInfoReldNm":
      return wantedDtl.inqplCtadrList?.wlfareInfoReldNm || "-";
    case "aplyMtdCn":
      return wantedDtl.aplyMtdCn || "-";
    case "alwServCn":
      return wantedDtl.alwServCn || "-";
    case "basfrmList":
      // basfrmList가 배열 또는 객체일 수 있음
      if (Array.isArray(wantedDtl.basfrmList)) {
        // 여러 개면 첫 번째만 표시, 필요시 map으로 여러 개 표시 가능
        return wantedDtl.basfrmList[0]?.wlfareInfoReldCn
          ? <a href={wantedDtl.basfrmList[0].wlfareInfoReldCn} target="_blank" rel="noopener noreferrer">{wantedDtl.basfrmList[0].wlfareInfoReldNm || "관련 자료"}</a>
          : "-";
      } else if (wantedDtl.basfrmList?.wlfareInfoReldCn) {
        // 객체일 경우
        return <a href={wantedDtl.basfrmList.wlfareInfoReldCn} target="_blank" rel="noopener noreferrer">{wantedDtl.basfrmList.wlfareInfoReldNm || "관련 자료"}</a>;
      }
      return "-";
    default:
      return "-";
  }
}

function PolicyCompare({ policies = [] }) {
  const theme = useTheme();

  // 정책이 충분하지 않은 경우 처리
  if (!policies || policies.length < 2) {
    return;
  }

  const [left, right] = policies;
  const leftName = left?.json?.wantedDtl?.servNm || "정책 1";
  const rightName = right?.json?.wantedDtl?.servNm || "정책 2";

  return (
    <Box className="policy-table" sx={{ p: 2, backgroundColor: "#F6F2FF" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ width: '40%', backgroundColor: '#6D4FC2', color: 'white', fontWeight: 'bold'}}>
              {leftName}
            </TableCell>
            <TableCell align="center" sx={{ width: '20%', backgroundColor: '#6D4FC2', color: 'white', fontWeight: 'bold'}}>
              항목
            </TableCell>
            <TableCell align="center" sx={{ width: '40%', backgroundColor: '#6D4FC2', color: 'white', fontWeight: 'bold'}}>
              {rightName}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {FIELDS.map((field) => (
            <TableRow key={field.key} sx={{ 
              '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
            }}>
              <TableCell sx={{ p: 2, verticalAlign: 'top' }}>
                {getFieldValue(left, field.key)}
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  backgroundColor: theme.palette.grey[50],
                  fontWeight: 'bold',
                  verticalAlign: 'middle',
                  borderLeft: `1px solid ${theme.palette.grey[200]}`,
                  borderRight: `1px solid ${theme.palette.grey[200]}`
                }}
              >
                {field.label}
              </TableCell>
              <TableCell sx={{ p: 2, verticalAlign: 'top' }}>
                {getFieldValue(right, field.key)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default PolicyCompare;
