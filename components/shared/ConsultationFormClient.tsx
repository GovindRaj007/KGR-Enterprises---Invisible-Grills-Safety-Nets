"use client";

import ConsultationForm from './ConsultationForm';

interface Props {
  onSubmit?: () => void;
  className?: string;
}

export default function ConsultationFormClient(props: Props) {
  return <ConsultationForm {...props} />;
}
