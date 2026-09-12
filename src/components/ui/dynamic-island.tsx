                  <motion.div
                    key="compact"
                    variants={fade}
                    key={`${activity.id}-compact`}
                    custom={expanded}
                    variants={contentMotion}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    {activity.collapsed ?? (
                      <div className="flex h-full w-full items-center justify-between gap-2 px-3.5">
                        <div className="flex min-w-0 items-center">
                          {activity.leading}
                        </div>
                        {activity.center && (
                          <div className="flex min-w-0 flex-1 items-center justify-center">
                            {activity.center}
                          </div>
                        )}
                        <div className="flex min-w-0 items-center justify-end">
                          {activity.trailing}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="expanded"
                    variants={fade}
                    key={`${activity.id}-expanded`}
                    custom={expanded}
                    variants={contentMotion}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 p-4"
                  >
                    {activity.expanded}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};

/* -------------------------------------------------------------------------- */
/*  Manager + context                                                          */
/* -------------------------------------------------------------------------- */

interface IslandContextValue {
  show: (activity: IslandActivity) => void;
  dismiss: () => void;
}

const IslandContext = createContext<IslandContextValue | null>(null);

export const useDynamicIsland = () => {
  const ctx = useContext(IslandContext);
  if (!ctx)
    throw new Error("useDynamicIsland must be used within DynamicIslandProvider");
    throw new Error(
      "useDynamicIsland must be used within DynamicIslandProvider",
    );
  return ctx;
};

export const DynamicIslandProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activity, setActivity] = useState<IslandActivity | null>(null);

  const show = useCallback((next: IslandActivity) => {
    // Retract first so the shape morphs from the resting pill again.
    setActivity(null);
    requestAnimationFrame(() =>
      setActivity({ ...next, id: `${next.id}-${Date.now()}` })
    );
    // Keep the physical shell mounted between activities. iOS morphs directly
    // from the current geometry instead of blinking back through the idle pill.
    setActivity({ ...next, id: `${next.id}-${Date.now()}` });
  }, []);

  const dismiss = useCallback(() => setActivity(null), []);

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <IslandContext.Provider value={value}>
      {children}
      <DynamicIsland activity={activity} onDismiss={dismiss} />
    </IslandContext.Provider>
  );
};

export default DynamicIsland;
