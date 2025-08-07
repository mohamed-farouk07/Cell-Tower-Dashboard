
export interface RecordsData {
  id: number;
  agentId: string;
  caseNo: string;
  serviceCategory: string;
  callType: string;
  callAbout: string;
  callDirection: string;
  callStatus: string;
  latestCallback: string;
  orderNumber: number;
  createdDate: string;
  url: string;
}

export interface ViewFormProps {
  selectedRecord: RecordsData | null;
}

export interface RecordDetailsProps {
  record: RecordsData;
}

export interface QuestionFormProps {
  onSave: (answers: { [key: number]: string }) => void;
  selectedAnswers: { [key: number]: string };
  setSelectedAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
}