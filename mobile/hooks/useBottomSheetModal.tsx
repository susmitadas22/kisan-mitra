import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";

export type useBottomSheetModalProps = {
  snapPoints: string[];
};

export const useBottomSheetModal = ({
  snapPoints,
}: useBottomSheetModalProps) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const openModal = useCallback(() => {
    modalRef.current?.present();
  }, []);
  const closeModal = useCallback(() => {
    modalRef.current?.forceClose();
  }, []);
  const modalSnapPoints = useMemo(() => snapPoints, [snapPoints]);
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={() => {
          closeModal();
        }}
        {...props}
      />
    ),
    []
  );
  return {
    openModal,
    closeModal,
    modalRef,
    modalSnapPoints,
    renderBackdrop,
  };
};
