export enum ArmType {
  LEFT = "left",
  RIGHT = "right",
}

export enum PositionType {
  SITTING = "sitting",
  LYING = "lying",
  STANDING = "standing",
}

export const ArmLabels: Record<ArmType, string> = {
  [ArmType.LEFT]: "Esquerdo",
  [ArmType.RIGHT]: "Direito",
};

export const PositionLabels: Record<PositionType, string> = {
  [PositionType.SITTING]: "Sentado",
  [PositionType.LYING]: "Deitado",
  [PositionType.STANDING]: "Em pé",
};

export const getArmLabel = (arm: string | null): string => {
  if (!arm) return "Não informado";

  const armType = arm.toLowerCase() as ArmType;
  return ArmLabels[armType] || arm;
};

export const getPositionLabel = (position: string | null): string => {
  if (!position) return "Não informado";

  const positionType = position.toLowerCase() as PositionType;
  return PositionLabels[positionType] || position;
};
