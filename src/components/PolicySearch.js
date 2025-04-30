import React from "react";
import { 
  Checkbox, 
  FormControlLabel, 
  List, 
  ListItem, 
  Typography, 
  Paper, 
  Box 
} from '@mui/material';
import { styled } from '@mui/material/styles';

// 메인 컬러 상수
const MAIN_COLOR = "#6D4FC2";

// 스타일링된 컴포넌트
const PolicyListItem = styled(ListItem)(({ theme, selected }) => ({
  padding: theme.spacing(1.5),
  margin: theme.spacing(1, 0),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  borderLeft: selected ? `4px solid ${MAIN_COLOR}` : '4px solid transparent',
  backgroundColor: selected ? "#f7f4fd" : "inherit",
  '&:hover': {
    backgroundColor: "#f3eefd",
  },
}));

const PolicyInfoBox = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const PolicyName = styled(Typography)(() => ({
  fontWeight: 600,
  color: MAIN_COLOR,
}));

const PolicyTarget = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
}));

const EmptyMessage = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function PolicySearch({ policies, selected, toggleSelect }) {
  // 정책 데이터에서 필요한 정보 추출
  const mappedPolicies = policies.map(policy => {
    if (!policy || !policy.json || !policy.json.wantedDtl) {
      return {
        id: policy?.service_id || "",
        name: "-",
        target: "-"
      };
    }
    
    const wantedDtl = policy.json.wantedDtl;
    return {
      id: policy.service_id,
      name: wantedDtl.servNm || "-",
      target: wantedDtl.sprtTrgtCn || "-"
    };
  });

  return (
    <div>
      <Box className="policy-search" sx={{ p: 2, backgroundColor: "#F6F2FF" }}>
        {mappedPolicies.length > 0 ? (
          <List disablePadding>
            {mappedPolicies.map((policy) => (
              <PolicyListItem 
                key={policy.id} 
                component={Paper} 
                elevation={1}
                selected={selected.includes(policy.id) ? 1 : 0}
                style={{ background: "#FFF" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selected.includes(policy.id)}
                      onChange={() => toggleSelect(policy.id)}
                      disabled={selected.length >= 2 && !selected.includes(policy.id)}
                      sx={{
                        color: MAIN_COLOR,
                        '&.Mui-checked': {
                          color: MAIN_COLOR,
                        },
                      }}
                    />
                  }
                  label={
                    <PolicyInfoBox>
                      <PolicyName variant="subtitle1">{policy.name}</PolicyName>
                      <PolicyTarget variant="body2">지원대상: {policy.target}</PolicyTarget>
                    </PolicyInfoBox>
                  }
                  sx={{ width: '100%', m: 0 }}
                />
              </PolicyListItem>
            ))}
          </List>
        ) : (
          <EmptyMessage variant="body1">표시할 정책이 없습니다.</EmptyMessage>
        )}
      </Box>
    </div>
  );
}

export default PolicySearch;
