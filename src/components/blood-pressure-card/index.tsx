import {
  ActivitySquare,
  Armchair,
  BicepsFlexed,
  HeartPulse,
  NotebookPen,
  Pill,
} from "lucide-react";

import { bloodPressureRecordTable } from "@/db/schema";
import { getArmLabel, getPositionLabel } from "@/types/blood-pressure";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BloodPressureData } from "./components/blood-pressure-data";

type BloodPressureRecord = typeof bloodPressureRecordTable.$inferSelect;

type Props = {
  bp: BloodPressureRecord;
};

export const BloodPressureCard = ({ bp }: Props) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <Card className="mx-auto w-full max-w-md shadow-lg transition-shadow hover:shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-xl font-bold text-gray-800">
          Medição de Pressão Arterial
        </CardTitle>
        <p className="text-center text-sm text-gray-600">
          {formatDate(bp.measurementTime)}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Pressão Arterial - Destaque principal */}
        <BloodPressureData
          icon={ActivitySquare}
          label="Pressão Arterial"
          value={`${bp.systolic}/${bp.diastolic} mmHg`}
          variant="primary"
        />

        {/* Dados secundários em grid */}
        <div className="mt-4 grid grid-cols-1 gap-3">
          <BloodPressureData
            icon={HeartPulse}
            label="Frequência Cardíaca"
            value={`${bp.pulse} bpm`}
          />

          <BloodPressureData
            icon={BicepsFlexed}
            label="Braço Utilizado"
            value={getArmLabel(bp.arm)}
          />

          <BloodPressureData
            icon={Armchair}
            label="Posição"
            value={getPositionLabel(bp.position)}
          />

          <BloodPressureData
            icon={Pill}
            label="Antes da Medicação"
            value={bp.beforeMedication ? "Sim" : "Não"}
          />

          {bp.notes && (
            <BloodPressureData
              icon={NotebookPen}
              label="Observações"
              value={bp.notes}
              isNote
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
